"""Optimize image-generated GLBs and add a gentle seven-bone character rig.
Usage: python scripts/prepare-characters.py [directory containing NAME-original.glb]
The source assets are produced from the owner's supplied character references.
"""
import json, struct, pathlib, subprocess, tempfile, sys, math
import numpy as np
source = pathlib.Path(sys.argv[1] if len(sys.argv)>1 else 'assets/characters/original')
out = pathlib.Path('public/models'); out.mkdir(exist_ok=True)
for name in ['kael','kai','milo']:
    raw=(source/f'{name}-original.glb').read_bytes()
    jslen=struct.unpack_from('<I',raw,12)[0]
    doc=json.loads(raw[20:20+jslen]); binary=raw[28+jslen:]
    parts=[]; length=0
    def append(data,target=None):
        global length
        pad=(-length)%4
        if pad: parts.append(bytes(pad)); length+=pad
        view={'buffer':0,'byteOffset':length,'byteLength':len(data)}
        if target: view['target']=target
        parts.append(data);length+=len(data)
        return view
    # Keep view indices stable while replacing the embedded PNG with WebP.
    imageviews={im['bufferView'] for im in doc.get('images',[])}
    views=[]
    for i,v in enumerate(doc['bufferViews']):
        data=binary[v.get('byteOffset',0):v.get('byteOffset',0)+v['byteLength']]
        if i in imageviews:
            with tempfile.TemporaryDirectory() as td:
                p=pathlib.Path(td);(p/'texture.png').write_bytes(data)
                subprocess.run(['ffmpeg','-loglevel','error','-y','-i',str(p/'texture.png'),'-frames:v','1','-c:v','libwebp','-quality','88',str(p/'texture.webp')],check=True)
                data=(p/'texture.webp').read_bytes()
        new=append(data,v.get('target'))
        if 'byteStride' in v:new['byteStride']=v['byteStride']
        views.append(new)
    doc['bufferViews']=views
    for im in doc['images']:im['mimeType']='image/webp'
    for tex in doc['textures']:
        tex['extensions']={'EXT_texture_webp':{'source':tex.pop('source')}}
    doc['extensionsUsed']=['EXT_texture_webp'];doc['extensionsRequired']=['EXT_texture_webp']
    def accessor(data,ctype,kind,count,normalized=False,target=None):
        idx=len(doc['bufferViews']);doc['bufferViews'].append(append(data,target))
        a={'bufferView':idx,'componentType':ctype,'count':count,'type':kind}
        if normalized:a['normalized']=True
        doc['accessors'].append(a);return len(doc['accessors'])-1
    # Bind poses are kept in the source mesh's unit-height coordinate space.
    positions=[(0,-.09,0),(0,.08,0),(0,.205,0),(-.112,.065,0),(.112,.065,0),(-.056,-.145,0),(.056,-.145,0)]
    parents=[None,0,1,1,1,0,0]
    names=['Root','Torso','Head','ArmLeft','ArmRight','LegLeft','LegRight']
    first=len(doc['nodes'])
    for i,(pos,parent,bname) in enumerate(zip(positions,parents,names)):
        offset=np.array(pos)-(np.array(positions[parent]) if parent is not None else 0)
        node={'name':bname,'translation':offset.tolist()}
        children=[first+j for j,p in enumerate(parents) if p==i]
        if children:node['children']=children
        doc['nodes'].append(node)
    doc['nodes'][0].setdefault('children',[]).append(first)
    inv=[]
    for pos in positions:
        m=np.eye(4,dtype=np.float32);m[:3,3]=-np.array(pos);inv.extend(m.flatten(order='F'))
    bind=accessor(np.array(inv,dtype='<f4').tobytes(),5126,'MAT4',7)
    doc['skins']=[{'name':name+' gentle pose rig','joints':list(range(first,first+7)),'skeleton':first,'inverseBindMatrices':bind}]
    def smooth(a,b,v):
        t=np.clip((v-a)/(b-a),0,1);return t*t*(3-2*t)
    for node in doc['nodes'][:first]:
        if 'mesh' not in node:continue
        node['skin']=0
        for prim in doc['meshes'][node['mesh']]['primitives']:
            a=doc['accessors'][prim['attributes']['POSITION']];v=views[a['bufferView']]
            # Read the unchanged position bytes from the original GLB.
            original_doc=json.loads(raw[20:20+jslen]);ov=original_doc['bufferViews'][a['bufferView']]
            offset=ov.get('byteOffset',0)+a.get('byteOffset',0)
            xyz=np.frombuffer(binary,dtype='<f4',count=a['count']*3,offset=offset).reshape(-1,3)
            x,y,z=xyz.T;n=len(x)
            w=np.zeros((n,7),dtype=np.float32)
            head=smooth(.13,.24,y);legs=1-smooth(-.23,-.125,y)
            arms=smooth(.092,.16,np.abs(x))*(1-smooth(.06,.16,y))*smooth(-.30,-.16,y)*(1-head)
            remaining=np.clip(1-head-legs-arms,0,1)
            torso=smooth(-.13,.025,y)
            w[:,0]=remaining*(1-torso);w[:,1]=remaining*torso;w[:,2]=head
            w[:,3]=arms*(x<0);w[:,4]=arms*(x>=0)
            w[:,5]=legs*(x<0);w[:,6]=legs*(x>=0)
            indices=np.argsort(-w,axis=1)[:,:4];weights=np.take_along_axis(w,indices,axis=1)
            weights/=np.maximum(weights.sum(axis=1,keepdims=True),1e-8)
            q=np.rint(weights*255).astype(np.int16);q[:,0]+=255-q.sum(axis=1)
            prim['attributes']['JOINTS_0']=accessor(indices.astype('u1').tobytes(),5121,'VEC4',n,target=34962)
            prim['attributes']['WEIGHTS_0']=accessor(q.astype('u1').tobytes(),5121,'VEC4',n,True,34962)
    # An embedded, subtle breathing clip is useful when the GLB is opened elsewhere.
    times=accessor(np.array([0,1,2,3,4],dtype='<f4').tobytes(),5126,'SCALAR',5)
    doc['accessors'][times]['min']=[0];doc['accessors'][times]['max']=[4]
    rots=[]
    for a in [0,.018,0,-.018,0]:rots.extend([math.sin(a/2),0,0,math.cos(a/2)])
    values=accessor(np.array(rots,dtype='<f4').tobytes(),5126,'VEC4',5)
    doc['animations']=[{'name':'Quiet breath','samplers':[{'input':times,'output':values,'interpolation':'LINEAR'}],'channels':[{'sampler':0,'target':{'node':first+2,'path':'rotation'}}]}]
    doc.setdefault('asset',{})['copyright']='DevOps Services — owner-supplied character designs; generated mesh, optimized texture and pose rig.'
    doc['asset']['generator']='to3D image reconstruction + DevOps character preparation'
    body=b''.join(parts);body+=bytes((-len(body))%4);doc['buffers']=[{'byteLength':len(body)}]
    js=json.dumps(doc,separators=(',',':'),ensure_ascii=False).encode();js+=b' '*((-len(js))%4)
    glb=struct.pack('<4sII',b'glTF',2,28+len(js)+len(body))+struct.pack('<I4s',len(js),b'JSON')+js+struct.pack('<I4s',len(body),b'BIN\0')+body
    (out/f'{name}.glb').write_bytes(glb)
    print(name,len(raw),'->',len(glb),'bytes; 7 joints, embedded WebP')

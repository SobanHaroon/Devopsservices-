"""Subset self-hosted Noto Sans JP to the glyphs used by this website.
Run after Japanese copy changes. Requires fonttools[woff].
The original SIL Open Font License is retained next to the fonts.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools import subset
import re, shutil

root=Path(__file__).resolve().parents[1]
source=root/'node_modules/@fontsource-variable/noto-sans-jp'
out=root/'public/fonts/japanese';out.mkdir(parents=True,exist_ok=True)
text=''.join(p.read_text() for p in (root/'src').rglob('*') if p.suffix in ['.tsx','.ts'])
needed={ord(c) for c in text if ord(c)>255}
css=[];total=0
for path in sorted((source/'files').glob('noto-sans-jp-*-wght-normal.woff2')):
 font=TTFont(path);available=set(font.getBestCmap());chars=available&needed
 # Latin and punctuation use Sora and Manrope; these subsets are Japanese only.
 chars={c for c in chars if c>=0x3000}
 if not chars:continue
 options=subset.Options();options.flavor='woff2';options.layout_features=['*']
 tool=subset.Subsetter(options=options);tool.populate(unicodes=chars);tool.subset(font)
 name='studio-'+path.name;target=out/name;font.save(target);total+=target.stat().st_size
 css.append('@font-face{font-family:"Noto Sans JP Variable";font-style:normal;font-weight:100 900;font-display:swap;src:url("/fonts/japanese/'+name+'") format("woff2");unicode-range:'+','.join('U+%X'%c for c in sorted(chars))+';}')
shutil.copy(source/'LICENSE',out/'LICENSE')
(root/'src/japanese-fonts.css').write_text('\n'.join(css))
print(f'{len(css)} Japanese subsets, {total:,} bytes, {len(needed)} source characters')

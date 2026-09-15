import sys
sys.path.insert(0,'.tools')
from PIL import Image,ImageDraw
from pathlib import Path
source=Image.open('src/assets/User attachment 5.png').convert('RGB')
rendered=Image.open('artifacts/qa/babay-home-rendered.png').convert('RGB')
print('Source:',source.size,'Rendered:',rendered.size)
source=source.resize(rendered.size,Image.Resampling.LANCZOS)
w,h=rendered.size
board=Image.new('RGB',(w*2,h+45),'#151613')
board.paste(source,(0,40));board.paste(rendered,(w,40))
d=ImageDraw.Draw(board)
d.text((12,12),'SUPPLIED BABAY DEE SCREENSHOT (normalized)',fill='white')
d.text((w+12,12),'ACTUAL WEBSITE IMAGE (browser capture)',fill='white')
board.save('artifacts/qa/babay-comparison.jpg')
poster=Image.open('public/media/studio-poster.jpg').convert('RGB')
hero=Image.open('artifacts/qa/desktop-hero.png').convert('RGB')
poster.thumbnail((360,620));hero.thumbnail((900,620))
board=Image.new('RGB',(1280,680),'#151613')
board.paste(poster,(20,45));board.paste(hero,(380,45))
d=ImageDraw.Draw(board);d.text((20,15),'VIDEO REFERENCE / mood, not a website mockup',fill='white')
d.text((390,15),'IMPLEMENTATION / cinematic studio interpretation',fill='white')
board.save('artifacts/qa/reference-comparison.jpg')

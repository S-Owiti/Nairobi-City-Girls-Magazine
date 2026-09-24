const photos = (label, sub='', extra='') => `<div class="photo ${extra}" role="img" aria-label="Photo placeholder: ${label}"><div><strong>${label}</strong>${sub ? `<em>${sub}</em>` : ''}</div></div>`;
const heading = (title) => `<header class="section-title"><h2>${title}</h2><span class="barcode" aria-hidden="true"></span></header>`;
const band = () => `<div class="slash" aria-hidden="true"></div>`;
const footer = (number) => `<footer class="folio"><span><b>${number}</b> &nbsp; NAIROBI CITY GIRLS MAGAZINE <i>|</i> MARCH 2026</span><span class="qr-placeholder" title="Final QR code pending a confirmed link">QR<br>LINK</span></footer>`;
const pages = [
  `<article class="page opener" aria-label="Page 16: Street-Style Showdown">
    <div class="opening-photo">${photos('NAIROBI CITY GIRL','UPCYCLED DENIM BUBBLE SKIRT')}</div>${band()}
    <div class="opening-copy"><p class="eyebrow">THE FRONT ROW / FASHION</p><h1>Street Style<br><i>Showdown</i></h1><p class="subhead">Streetwear <span>✳</span> Live Music <span>✳</span> Culture</p><p>On a Saturday in Nairobi, fashion moved beyond the runway and into the room. Streetwear, music and heritage met at City Boy Est.</p><p class="small-note">FEBRUARY 2026 · CITY BOY EST.</p></div>${footer(16)}</article>`,
  `<article class="page city-page" aria-label="Page 17: City Boy Est."><div class="body-content">${heading('City Boy Est.')}<p class="lead">Inside the graffiti-marked walls of City Boy Est., an industrial venue became a home for Nairobi’s street-style conversation.</p>${photos('CITY BOY EST.','GRAFFITI WALLS, OPEN CONCRETE','hero-photo')}${band()}<div class="photo-pair">${photos('STREET ART','INDUSTRIAL TEXTURES')}${photos('OPEN CONCRETE','THE RUNWAY SPACE')}</div></div>${footer(17)}</article>`,
  `<article class="page heritage-page" aria-label="Page 18: A Language of Heritage"><div class="body-content"><div class="heritage-grid">${photos('CROCHET & KITENGE','THREAD MADE ARCHITECTURE','tall-photo')}<aside class="black-box"><h2>A Language of Heritage</h2><p>Designers brought traditional textures into modern silhouettes: crochet, kitenge, denim and accessories with a strong sense of place.</p><div class="mini-pair">${photos('CRAFT','DETAIL')}${photos('TEXTURE','DETAIL')}</div></aside></div><p class="image-caption">Kitenge met denim. Crochet turned thread into form.</p>${band()}${photos('WAIST BEADS & LAYERED JEWELLERY','A MODERN CITY RUNWAY','wide-photo')}</div>${footer(18)}</article>`,
  `<article class="page sound-page" aria-label="Page 19: The Sound of the Runway"><div class="body-content">${heading('The Sound of the Runway')}<p class="lead">Live performance carried the evening. Fashion moved with the music, and the audience became part of the rhythm.</p>${band()}<div class="photo-grid">${photos('LIVE VOCALIST','ON STAGE')}${photos('FEATURED ARTIST','ON STAGE')}${photos('CROWD ENERGY','FRONT ROW')}${photos('MODEL + RHYTHM','RUNWAY')}</div><p class="image-caption">Fashion became movement; music set the atmosphere.</p></div>${footer(19)}</article>`,
  `<article class="page crowd-page" aria-label="Page 20: What the Community Said"><div class="body-content">${photos('THE CROWD','SOUL SOCIETY · FEB 28','wide-photo')}${band()}${heading('What the Community Said')}<p>Attendees celebrated the live performances and fashion showcases, while sharing ideas for more space to socialise and an even smoother event flow.</p><blockquote>Creative movements grow through the people who show up, speak up and return.</blockquote></div>${footer(20)}</article>`,
  `<article class="page platform-page" aria-label="Page 21: A Platform in Motion"><div class="body-content"><div class="black-label">A Platform in Motion</div><p>Street-Style Showdown was created within Soul Society, where fashion, music and visual culture could meet on equal ground.</p><p>The first edition opened a conversation. The next one can grow with the designers, performers and audience who made it possible.</p>${photos('SOUL SOCIETY','THE ROOM THAT STARTED IT','hero-photo')}${band()}<blockquote>In this city, clothing is never just clothing. It carries rhythm, memory and identity.</blockquote></div>${footer(21)}</article>`,
  `<article class="page author-page" aria-label="Page 22: Meet the Author"><div class="body-content">${heading('Meet the Author')}<div class="author-grid">${photos('OWIRRIANA','WRITER · ARTIST · DATA SCIENTIST','author-photo')}<div class="black-box"><h2>Owirriana</h2><p>Writer, artist and data scientist, documenting the people and culture shaping Nairobi.</p><p class="credit-label">WORDS + MAGAZINE DESIGN</p><p>Owirriana</p><p class="credit-label">PHOTOGRAPHY</p><p>Sidoh Official</p><div class="qr-placeholder large" title="Final link pending">QR<br>LINK</div></div></div>${band()}<blockquote>Behind every look is a story worth telling.</blockquote></div>${footer(22)}</article>`
];
const spread=document.querySelector('#spread');const counter=document.querySelector('#page-counter');const progress=document.querySelector('#progress');const contents=document.querySelector('#contents');const contentsToggle=document.querySelector('#contents-toggle');let start=0;let locked=false;
function isSingle(){return window.matchMedia('(max-width: 780px)').matches}
function positions(){return isSingle()?[0,1,2,3,4,5,6]:[0,1,3,5]}
function currentPosition(){return positions().reduce((last,p)=>p<=start?p:last,0)}
function closeContents(){contents.hidden=true;contentsToggle.setAttribute('aria-expanded','false')}
function render(){const place=currentPosition();start=place;spread.classList.toggle('single',isSingle()||place===0);spread.innerHTML=pages[place]+(!isSingle()&&place>0&&place+1<pages.length?pages[place+1]:'');counter.textContent=place===0||isSingle()?`${place+16} / 22`:`${place+16}–${place+17} / 22`;progress.style.width=`${((place+(isSingle()||place===0?1:2))/pages.length)*100}%`;const ps=positions();const idx=ps.indexOf(place);document.querySelectorAll('#prev,#edge-prev').forEach(b=>b.disabled=idx===0);document.querySelectorAll('#next,#edge-next').forEach(b=>b.disabled=idx===ps.length-1)}
function turn(delta){
  if(locked)return;
  const ps=positions();const old=currentPosition();const targetIndex=ps.indexOf(old)+delta;
  if(targetIndex<0||targetIndex>=ps.length)return;
  const next=ps[targetIndex];locked=true;
  const single=isSingle()||old===0;
  const front=single?pages[old]:(delta>0?pages[Math.min(old+1,6)]:pages[old]);
  const back=single?pages[next]:(delta>0?pages[next]:pages[Math.min(next+1,6)]);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){start=next;render();locked=false;return}
  if(isSingle()||old===0){start=next;render()}
  else spread.innerHTML=delta>0?pages[old]+pages[Math.min(next+1,6)]:pages[next]+pages[Math.min(old+1,6)];
  const layer=document.createElement('div');
  layer.className=`turn-layer ${delta>0?'forward':'backward'} ${single?'mobile-turn':''}`;
  layer.innerHTML=`<div class="turn-face turn-front">${front}</div><div class="turn-face turn-back">${back}</div>`;
  document.querySelector('.magazine').append(layer);
  requestAnimationFrame(()=>requestAnimationFrame(()=>layer.classList.add('is-turning')));
  setTimeout(()=>{layer.remove();start=next;render();locked=false},680);
}
document.querySelectorAll('#prev,#edge-prev').forEach(b=>b.onclick=()=>turn(-1));document.querySelectorAll('#next,#edge-next').forEach(b=>b.onclick=()=>turn(1));
contentsToggle.onclick=()=>{contents.hidden=!contents.hidden;contentsToggle.setAttribute('aria-expanded',String(!contents.hidden))};document.querySelector('#contents-close').onclick=closeContents;contents.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{let wanted=Number(b.dataset.page);start=isSingle()?wanted:positions().reduce((p,n)=>n<=wanted?n:p,0);render();closeContents()});
document.querySelector('#fullscreen').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen?.()};
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')turn(1);if(e.key==='ArrowLeft')turn(-1);if(e.key==='Escape')closeContents()});window.addEventListener('resize',()=>{if(!locked)render()});render();

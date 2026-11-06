
(function(){
/* ============================================================
   EDIT HERE. Products, prices and checkout links.
   buyUrl: paste a payment link from Stripe, Payhip, Gumroad or Lemon Squeezy.
   That service takes payment and emails the download. Leave '' until it is set.
   Set SAMPLE to false to remove the sample banner.
   ============================================================ */
var SAMPLE=true;
var STORE={name:'Sincere M Visuals',email:'sinceremirandaphotographs@gmail.com',site:'sinceremvisuals.com',refundDays:14};
var CATS=["All", "E-books", "Presets", "Plugins and templates", "Bundles"];
var PRODUCTS=[
 {
  "slug": "cinematic-lut-pack",
  "title": "Cinematic LUT Pack",
  "cat": "Presets",
  "tag": "Video LUTs",
  "price": 24,
  "compare": 0,
  "hue": 180,
  "motif": "strip",
  "badge": "",
  "blurb": "Ten film-inspired color looks for video. Drop one on your timeline and adjust the intensity.",
  "includes": [
   "10 .cube LUTs",
   "Log and Rec.709 versions",
   "Short guide for Premiere Pro and DaVinci Resolve"
  ],
  "spec": [
   [
    "Format",
    ".cube"
   ],
   [
    "Works with",
    "Premiere Pro, DaVinci Resolve, Final Cut Pro, CapCut"
   ],
   [
    "Delivery",
    "Instant download by email"
   ]
  ],
  "buyUrl": ""
 },
 {
  "slug": "lower-thirds-titles",
  "title": "Lower Thirds and Titles for Premiere",
  "cat": "Plugins and templates",
  "tag": "Premiere templates",
  "price": 34,
  "compare": 0,
  "hue": 20,
  "motif": "lower",
  "badge": "",
  "blurb": "Clean title cards, lower thirds and end cards you edit right in Premiere Pro. No After Effects needed.",
  "includes": [
   "Title card, 8 lower thirds and an end card",
   "Editable text, color and font",
   "Caption styles for vertical video",
   "Install guide"
  ],
  "spec": [
   [
    "Format",
    ".mogrt"
   ],
   [
    "Works with",
    "Premiere Pro 2022 or newer"
   ],
   [
    "Delivery",
    "Instant download by email"
   ]
  ],
  "buyUrl": ""
 },
 {
  "slug": "premiere-project-template",
  "title": "Premiere Project Template",
  "cat": "Plugins and templates",
  "tag": "Premiere project",
  "price": 15,
  "compare": 0,
  "hue": 340,
  "motif": "bins",
  "badge": "",
  "blurb": "A ready project with labeled bins for footage, audio, music, graphics and captions, so every edit starts organized.",
  "includes": [
   "Premiere Pro project with bins and sequences set up",
   "Naming guide for footage and exports",
   "Export presets for Instagram and YouTube"
  ],
  "spec": [
   [
    "Format",
    ".prproj"
   ],
   [
    "Works with",
    "Premiere Pro 2022 or newer"
   ],
   [
    "Delivery",
    "Instant download by email"
   ]
  ],
  "buyUrl": ""
 },
 {
  "slug": "celebration-of-life-playbook",
  "title": "Celebration of Life Filming Playbook",
  "cat": "E-books",
  "tag": "E-book \u00b7 PDF",
  "price": 24,
  "compare": 0,
  "hue": 210,
  "motif": "book",
  "badge": "",
  "blurb": "How to film a memorial with care: what to ask the family, where to stand, what to capture and how to edit with restraint.",
  "includes": [
   "Planning call questions for the family",
   "Respectful coverage guide",
   "Audio and lighting for chapels and venues",
   "Edit and music approach",
   "Release and consent notes"
  ],
  "spec": [
   [
    "Format",
    "PDF"
   ],
   [
    "Length",
    "48 pages"
   ],
   [
    "Works on",
    "Any phone, tablet or computer"
   ]
  ],
  "buyUrl": ""
 },
 {
  "slug": "creator-bundle",
  "title": "The Creator Bundle",
  "cat": "Bundles",
  "tag": "Everything",
  "price": 79,
  "compare": 158,
  "hue": 45,
  "motif": "stack",
  "badge": "Save 50%",
  "blurb": "Every e-book, preset pack, LUT pack and Premiere template in one purchase, plus future additions.",
  "includes": [
   "Both e-books",
   "Both Lightroom preset packs",
   "Cinematic LUT pack",
   "Lower thirds and titles",
   "Premiere project template",
   "Future releases included"
  ],
  "spec": [
   [
    "Format",
    "PDF, .xmp, .dng, .cube, .mogrt, .prproj"
   ],
   [
    "Delivery",
    "Instant download by email"
   ]
  ],
  "buyUrl": ""
 }
];
/* ============================================================ */

var app=document.getElementById('shop-root'),cat='All';
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function money(n){return '$'+Number(n).toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:2})}
function hsl(h,s,l){return 'hsl('+h+' '+s+'% '+l+'%)'}

function cover(p){
  var h=p.hue,bg1=hsl(h,38,14),bg2=hsl(h,30,8),ac=hsl(h,55,62),m='';
  if(p.motif==='book'){m='<rect x="228" y="62" width="104" height="140" fill="'+hsl(h,35,22)+'" stroke="'+ac+'" stroke-width="2"/><rect x="238" y="72" width="104" height="140" fill="'+hsl(h,35,28)+'" stroke="'+ac+'" stroke-width="2"/><line x1="254" y1="104" x2="326" y2="104" stroke="'+ac+'" stroke-width="3"/><line x1="254" y1="120" x2="314" y2="120" stroke="'+ac+'" stroke-width="2" opacity=".6"/>'}
  else if(p.motif==='swatch'){for(var i=0;i<6;i++)m+='<rect x="'+(52+i*46)+'" y="'+(70+(i%2)*12)+'" width="38" height="120" fill="'+hsl(h+i*9-20,50,30+i*6)+'"/>'}
  else if(p.motif==='strip'){m='<defs><linearGradient id="g'+h+'" x1="0" x2="1"><stop offset="0" stop-color="'+hsl(h,60,20)+'"/><stop offset=".5" stop-color="'+hsl(h+40,50,45)+'"/><stop offset="1" stop-color="'+hsl(h+90,60,30)+'"/></linearGradient></defs><rect x="52" y="86" width="256" height="88" fill="url(#g'+h+')"/><rect x="52" y="182" width="256" height="6" fill="'+ac+'"/>'}
  else if(p.motif==='lower'){m='<rect x="52" y="64" width="256" height="130" fill="'+hsl(h,25,12)+'" stroke="'+hsl(h,20,24)+'"/><rect x="52" y="146" width="168" height="34" fill="'+ac+'"/><rect x="62" y="156" width="96" height="6" fill="'+hsl(h,40,10)+'"/><rect x="62" y="168" width="64" height="5" fill="'+hsl(h,40,10)+'" opacity=".6"/>'}
  else if(p.motif==='bins'){for(var j=0;j<4;j++)m+='<path d="M52 '+(70+j*34)+'h38l8 8h210v22H52z" fill="'+hsl(h+j*14,40,28)+'" stroke="'+ac+'" stroke-width="1.5"/>'}
  else if(p.motif==='stack'){for(var k=0;k<4;k++)m+='<rect x="'+(60+k*30)+'" y="'+(64+k*14)+'" width="150" height="110" fill="'+hsl(h+k*22,35,16+k*5)+'" stroke="'+ac+'" stroke-width="1.5"/>'}
  var words=p.title.split(' '),lines=[],cur='';
  words.forEach(function(w){if((cur+' '+w).trim().length>20){lines.push(cur.trim());cur=w}else cur+=' '+w});lines.push(cur.trim());
  var t='';lines.slice(0,3).forEach(function(l,i){t+='<text x="28" y="'+(262+i*30)+'" font-family="Cormorant Garamond,Georgia,serif" font-weight="700" font-size="28" fill="#F2EBDD">'+esc(l)+'</text>'});
  return '<svg viewBox="0 0 360 360" role="img" aria-label="Cover: '+esc(p.title)+'"><defs><linearGradient id="b'+p.slug+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+bg1+'"/><stop offset="1" stop-color="'+bg2+'"/></linearGradient></defs><rect width="360" height="360" fill="url(#b'+p.slug+')"/>'+m+'<line x1="28" y1="228" x2="76" y2="228" stroke="'+ac+'" stroke-width="3"/>'+t+'<text x="28" y="34" font-family="DM Sans,sans-serif" font-size="11" letter-spacing="2.6" fill="'+ac+'">SINCERE M VISUALS</text></svg>';
}
function priceHtml(p){return '<div class="price"><b>'+money(p.price)+'</b>'+(p.compare?'<s>'+money(p.compare)+'</s>':'')+(p.badge?'<span class="badge">'+esc(p.badge)+'</span>':'')+'</div>'}

function banner(){return SAMPLE?'<div class="sample" style="margin:-8px calc(-1*var(--pad)) 32px">Sample products and prices. Edit js/shop.js and add your checkout links to go live.</div>':''}
function priceHtml(p){return '<div class="pr"><b>'+money(p.price)+'</b>'+(p.compare?'<s>'+money(p.compare)+'</s>':'')+(p.badge?'<span class="badge">'+esc(p.badge)+'</span>':'')+'</div>'}
function faqHtml(){return '<div class="sec"><h2>Questions</h2><div>'+
 [['How do I get my files?','Right after payment you get an email with a download link. Files work on any computer. If it does not arrive in a few minutes, check spam and then email '+STORE.email+'.'],
  ['Can I use presets and templates on client work?','Yes. One purchase covers one person, for personal and client projects. You cannot resell, share or give away the files.'],
  ['What is your refund policy?','Digital files cannot be returned, so if something does not work or is not as described, email within '+STORE.refundDays+' days and I will make it right or refund you.'],
  ['Will the presets work on my version of Lightroom?','Each product page lists what it works with. Lightroom presets use the standard .xmp format for Lightroom Classic, Lightroom and Lightroom mobile.']
 ].map(function(q){return '<details><summary>'+esc(q[0])+'</summary><p>'+esc(q[1])+'</p></details>'}).join('')+'</div></div>'}
function shop(){
  var L=PRODUCTS.filter(function(p){return cat==='All'||p.cat===cat});
  app.innerHTML=banner()+'<div class="rail" role="group" aria-label="Filter products">'+CATS.map(function(c){return '<button type="button" data-c="'+esc(c)+'" aria-pressed="'+(c===cat)+'">'+esc(c)+'</button>'}).join('')+'</div>'+
  (L.length?'<div class="pgrid">'+L.map(function(p){return '<a class="pcard" href="#p-'+p.slug+'"><div class="cov">'+cover(p)+'</div><span class="tag">'+esc(p.tag)+'</span><h3>'+esc(p.title)+'</h3>'+priceHtml(p)+'</a>'}).join('')+'</div>':'<p>Nothing in this category yet.</p>')+faqHtml();
  [].forEach.call(app.querySelectorAll('.rail button'),function(b){b.addEventListener('click',function(){cat=b.getAttribute('data-c');shop()})});
}
function product(p){
  var rel=PRODUCTS.filter(function(x){return x.slug!==p.slug}).slice(0,3);
  app.innerHTML=banner()+'<p style="margin-bottom:20px"><a href="#shop" style="color:var(--muted);text-decoration:none">← All products</a></p><div class="pp"><div class="cov">'+cover(p)+'</div><div class="buy"><span class="tag" style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)">'+esc(p.tag)+'</span><h2>'+esc(p.title)+'</h2>'+priceHtml(p)+'<p class="lede" style="font-size:17px;margin:0">'+esc(p.blurb)+'</p>'+
  (p.buyUrl?'<a class="btn" href="'+esc(p.buyUrl)+'" target="_blank" rel="noopener">Buy now · '+money(p.price)+'</a>':'<button class="btn" id="buy" type="button">Buy now · '+money(p.price)+'</button><div id="msg" class="msg" hidden>Checkout is not connected for this product yet. Paste its payment link into buyUrl in js/shop.js.</div>')+
  '<p class="fine" style="margin:0">Secure checkout with the payment provider. Instant download by email. '+STORE.refundDays+' day support guarantee.</p></div></div>'+
  '<div class="sec"><h2>What you get</h2><ul>'+p.includes.map(function(i){return '<li>'+esc(i)+'</li>'}).join('')+'</ul></div>'+
  '<div class="sec"><h2>Details</h2><dl class="spec">'+p.spec.map(function(s){return '<dt>'+esc(s[0])+'</dt><dd>'+esc(s[1])+'</dd>'}).join('')+'<dt>License</dt><dd>One person. Personal and client work. No resale or sharing.</dd></dl></div>'+
  '<div class="sec"><h2>More from the shop</h2><div class="pgrid" style="grid-template-columns:repeat(auto-fill,minmax(190px,1fr))">'+rel.map(function(x){return '<a class="pcard" href="#p-'+x.slug+'"><div class="cov">'+cover(x)+'</div><h3>'+esc(x.title)+'</h3>'+priceHtml(x)+'</a>'}).join('')+'</div></div>';
  var b=document.getElementById('buy');if(b)b.addEventListener('click',function(){document.getElementById('msg').hidden=false});
}
function route(){
  var h=(location.hash||'').replace('#','');
  if(h.indexOf('p-')===0){var p=PRODUCTS.filter(function(x){return 'p-'+x.slug===h})[0];if(p){window.scrollTo(0,0);document.title=p.title+' | Sincere M';return product(p)}}
  shop();
}
window.addEventListener('hashchange',route);route();
})();

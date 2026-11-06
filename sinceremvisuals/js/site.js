/* Sincere M site scripts: menu, lightbox, inquiry forms.
   SITE.formEndpoint: paste a Formspree (or similar) form URL to have inquiries emailed to you automatically.
   Leave it empty and visitors get a summary they can copy or open in their email app. */
window.SITE=window.SITE||{};
SITE.email=SITE.email||'sinceremirandaphotographs@gmail.com';
SITE.formEndpoint=SITE.formEndpoint||'';
(function(){
  var mb=document.getElementById('menu-btn'),nav=document.getElementById('main-nav');
  if(mb&&nav)mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',String(o))});
  [].forEach.call(document.querySelectorAll('[data-year]'),function(e){e.textContent=new Date().getFullYear()});

  /* Lightbox for gallery figures */
  var lb=null;
  function closeLb(){if(lb){lb.remove();lb=null;document.removeEventListener('keydown',esc)}}
  function esc(e){if(e.key==='Escape')closeLb()}
  [].forEach.call(document.querySelectorAll('.masonry figure'),function(f){
    f.tabIndex=0;f.setAttribute('role','button');
    function open(){var im=f.querySelector('img');lb=document.createElement('div');lb.className='lb';lb.innerHTML='<img alt=""><button type="button">Close</button>';lb.querySelector('img').src=im.src;lb.querySelector('img').alt=im.alt;lb.addEventListener('click',closeLb);document.body.appendChild(lb);document.addEventListener('keydown',esc);lb.querySelector('button').focus()}
    f.addEventListener('click',open);f.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
  });

  /* Inquiry forms */
  [].forEach.call(document.querySelectorAll('form[data-form]'),function(f){
    var err=f.querySelector('.err'),done=document.querySelector('[data-done="'+f.getAttribute('data-form')+'"]');
    if(!done)return;
    var sum=done.querySelector('[data-sum]'),mail=done.querySelector('[data-mail]'),copy=done.querySelector('[data-copy]'),edit=done.querySelector('[data-edit]'),thanks=done.querySelector('[data-thanks]'),manual=done.querySelector('[data-manual]');
    [].forEach.call(f.querySelectorAll('.opts[data-single]'),function(g){
      [].forEach.call(g.querySelectorAll('input'),function(b){b.addEventListener('change',function(){if(b.checked)[].forEach.call(g.querySelectorAll('input'),function(o){if(o!==b)o.checked=false})})})});
    function label(el){var q=el.closest('.q'),l=q.querySelector('label,legend');return l.textContent.replace(/\s*\*\s*$/,'').replace(/^\d+\.\s*/,'').trim()}
    function collect(){
      var L=[],bad=[];
      [].forEach.call(f.querySelectorAll('input[type=text],input[type=email],input[type=tel],input[type=date],select,textarea'),function(el){
        var v=el.value.trim(),lab=label(el);
        if(el.required&&!v)bad.push(lab);if(v)L.push(lab+'\n   '+v)});
      [].forEach.call(f.querySelectorAll('.opts'),function(g){
        var picked=[].filter.call(g.querySelectorAll('input:checked'),function(){return true}).map(function(i){return i.value}),lab=label(g);
        if(g.hasAttribute('data-required')&&!picked.length)bad.push(lab);if(picked.length)L.push(lab+'\n   '+picked.join(', '))});
      return {L:L,bad:bad};
    }
    f.addEventListener('submit',function(e){
      e.preventDefault();var r=collect();
      if(r.bad.length){err.hidden=false;err.textContent='Please fill in: '+r.bad.join('; ');return}
      err.hidden=true;
      var subject=f.getAttribute('data-subject')||'Website inquiry',text=subject.toUpperCase()+'\n\n'+r.L.join('\n\n');
      function showManual(){thanks.hidden=true;manual.hidden=false;sum.textContent=text;mail.href='mailto:'+SITE.email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(text);f.hidden=true;done.hidden=false;done.scrollIntoView({block:'start'})}
      function showThanks(){manual.hidden=true;thanks.hidden=false;f.hidden=true;done.hidden=false;done.scrollIntoView({block:'start'})}
      if(SITE.formEndpoint){
        fetch(SITE.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({subject:subject,message:text})})
          .then(function(res){res.ok?showThanks():showManual()}).catch(showManual);
      }else showManual();
    });
    if(copy)copy.addEventListener('click',function(){var b=this,t=sum.textContent;
      function sel(){var rg=document.createRange();rg.selectNodeContents(sum);var s=getSelection();s.removeAllRanges();s.addRange(rg);b.textContent='Selected. Press copy on your keyboard'}
      try{navigator.clipboard.writeText(t).then(function(){b.textContent='Copied'},sel)}catch(x){sel()}});
    if(edit)edit.addEventListener('click',function(){done.hidden=true;f.hidden=false;window.scrollTo(0,0)});
  });
})();

document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.rplay');if(!b)return;var v=document.createElement('video');v.controls=true;v.playsInline=true;v.autoplay=true;v.poster=b.getAttribute('data-poster');v.src=b.getAttribute('data-src');b.parentNode.replaceChild(v,b);});

/* ===== Visuals motion ===== */
(function(){
  var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(q,r){return (r||document).querySelector(q)}
  function $$(q,r){return Array.prototype.slice.call((r||document).querySelectorAll(q))}
  // hero frame: sweep + parallax
  var fr=$('.hero .frame');
  if(fr&&!RM){var sw=document.createElement('span');sw.className='sweep';fr.appendChild(sw);
    var im=$('img',fr);fr.addEventListener('mousemove',function(e){var r=fr.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;im.style.transform='scale(1.06) translate('+(-x*14)+'px,'+(-y*14)+'px)'});
    fr.addEventListener('mouseleave',function(){im.style.transform=''})}
  // scroll reveal
  var rvEls=$$('.band .band-head,.work-card,.door,.counts,.stage,.pipe,.split');
  rvEls.forEach(function(e){e.classList.add('rv')});
  function reveal(e){e.classList.add('rv-in')}
  if(RM||!('IntersectionObserver' in window)){rvEls.forEach(reveal)}
  else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){reveal(x.target);io.unobserve(x.target)}})},{threshold:.15});rvEls.forEach(function(e,i){e.style.transitionDelay=(i%3)*90+'ms';io.observe(e)})}
  // generic in-view
  $$('[data-inview]').forEach(function(el){if(RM||!('IntersectionObserver' in window)){el.classList.add('in');return}var o=new IntersectionObserver(function(en){if(en[0].isIntersecting){el.classList.add('in');o.disconnect()}},{threshold:.2});o.observe(el)});
  // engine
  var eng=$('#engine');
  if(eng){
    var caps=['Strategy: we set the audience, the message and the one thing people should do.',
      'Shoot: one planned day of footage, framed for vertical, square and wide.',
      'Cut: Reels, Shorts, TikTok and a brand film, all from the same shoot.',
      'Launch: the content and the ads go live together, on every platform.',
      'Optimize: we read the results weekly and put budget behind what works.'];
    var nodes=$$('.node',eng),fill=$('.pl-fill',eng),cap=$('[data-cap]',eng),cur=0,timer=null,touched=false;
    function setStep(i){cur=i;nodes.forEach(function(n,k){n.classList.toggle('on',k===i);n.classList.toggle('done',k<i)});
      if(fill)fill.style.strokeDashoffset=String(100-(i/(nodes.length-1))*100);
      if(cap){cap.style.opacity=0;setTimeout(function(){cap.textContent=caps[i];cap.style.opacity=1},RM?0:180)}}
    nodes.forEach(function(n,k){n.addEventListener('click',function(){touched=true;clearInterval(timer);setStep(k)});n.addEventListener('mouseenter',function(){if(!RM){touched=true;clearInterval(timer);setStep(k)}})});
    setStep(0);
    function start(){if(RM||timer)return;timer=setInterval(function(){if(touched){clearInterval(timer);return}setStep((cur+1)%nodes.length)},3600)}
    // counters
    function count(){$$('[data-count]',eng).forEach(function(el){var to=+el.getAttribute('data-count'),suf=el.getAttribute('data-suf')||'',t0=null;
      if(RM){el.textContent=to+suf;return}
      (function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(step)})(performance.now())})}
    if('IntersectionObserver' in window){var o2=new IntersectionObserver(function(en){if(en[0].isIntersecting){eng.classList.add('in');count();start();o2.disconnect()}},{threshold:.25});o2.observe(eng)}
    else{eng.classList.add('in');count()}
  }
})();

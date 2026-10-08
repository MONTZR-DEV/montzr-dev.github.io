(function(){
  function setLang(l){
    document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';
    document.querySelectorAll('.lang').forEach(function(b){var t=b.querySelector('.lang-t')||b;t.textContent=l==='ar'?'English':'العربية'});
    var t=document.documentElement.getAttribute('data-title-'+l);if(t)document.title=t;
    try{localStorage.setItem('portfolio_lang',l)}catch(e){}
    document.dispatchEvent(new Event('langchange'));
  }
  var s=null;try{s=localStorage.getItem('portfolio_lang')}catch(e){}
  var q=new URLSearchParams(location.search).get('lang');
  setLang(q==='ar'||q==='en'?q:(s||((navigator.language||'en').indexOf('ar')===0?'ar':'en')));
  window.toggleLanguage=function(){setLang(document.documentElement.lang==='ar'?'en':'ar')};

  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.glass').forEach(function(c){
      c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--x',(e.clientX-r.left)+'px');c.style.setProperty('--y',(e.clientY-r.top)+'px')});
    });
    var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
    /* tabs */
    document.querySelectorAll('[data-tabs]').forEach(function(g){
      var btns=g.querySelectorAll('.tab-btn'),panes=g.querySelectorAll('.tab-pane');
      btns.forEach(function(b){b.addEventListener('click',function(){
        btns.forEach(function(o){o.classList.toggle('on',o===b);o.setAttribute('aria-selected',o===b)});
        panes.forEach(function(p){p.classList.toggle('on',p.id===b.dataset.tab)});
      })});
    });
    /* project filter */
    var fb=document.querySelectorAll('.filter button');
    fb.forEach(function(b){b.addEventListener('click',function(){
      fb.forEach(function(o){o.classList.toggle('on',o===b)});
      document.querySelectorAll('.pcard').forEach(function(c){c.style.display=(b.dataset.f==='all'||c.dataset.cat===b.dataset.f)?'':'none'});
    })});
    /* typing role */
    var tp=document.getElementById('typed');
    if(tp){var words={en:['Systems Programmer','Game Developer','Android Developer'],ar:['مبرمج أنظمة','مطوّر ألعاب','مطوّر تطبيقات أندرويد']},wi=0,ci=0,del=false;
      (function tick(){var L=words[document.documentElement.lang]||words.en,w=L[wi%L.length];
        tp.textContent=w.slice(0,ci);if(!del&&ci<w.length)ci++;else if(!del){del=true;return setTimeout(tick,1600)}else if(ci>0)ci--;else{del=false;wi++}
        setTimeout(tick,del?45:95)})();
      document.addEventListener('langchange',function(){ci=0;del=false});}
    /* contact form -> mail app */
    var f=document.getElementById('cform');
    if(f)f.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(f);
      location.href='mailto:m00585254@gmail.com?subject='+encodeURIComponent('[Website] '+(d.get('name')||''))+'&body='+encodeURIComponent((d.get('msg')||'')+'\n\n— '+(d.get('name')||'')+' <'+(d.get('email')||'')+'>');
      var ok=document.getElementById('cok');if(ok)ok.hidden=false;});
    /* reveal on scroll */
    var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.12}):null;
    document.querySelectorAll('.rv').forEach(function(el){io?io.observe(el):el.classList.add('in')});
    /* active nav on scroll */
    var secs=document.querySelectorAll('main section[id]'),nl=document.querySelectorAll('.links a[href^="#"]');
    if(secs.length&&nl.length)addEventListener('scroll',function(){var cur='';secs.forEach(function(s){if(scrollY+140>=s.offsetTop)cur=s.id});
      nl.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+cur)})},{passive:true});
  });
})();

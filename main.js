(function(){
  function setLang(l){
    document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';
    document.querySelectorAll('.lang').forEach(function(b){b.textContent=l==='ar'?'English':'العربية'});
    var t=document.documentElement.getAttribute('data-title-'+l);if(t)document.title=t;
    try{localStorage.setItem('portfolio_lang',l)}catch(e){}
  }
  var s=null;try{s=localStorage.getItem('portfolio_lang')}catch(e){}
  var q=new URLSearchParams(location.search).get('lang');
  setLang(q==='ar'||q==='en'?q:(s||((navigator.language||'en').indexOf('ar')===0?'ar':'en')));
  window.toggleLanguage=function(){setLang(document.documentElement.lang==='ar'?'en':'ar')};
  document.addEventListener('DOMContentLoaded',function(){
    var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
    document.querySelectorAll('.reveal').forEach(function(el){io?io.observe(el):el.classList.add('in')});
    document.querySelectorAll('.card').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--x',(e.clientX-r.left)+'px');c.style.setProperty('--y',(e.clientY-r.top)+'px')})});
    var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
  });
})();

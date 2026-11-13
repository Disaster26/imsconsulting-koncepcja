(function(){
  var b=document.querySelector('.burger'),m=document.getElementById('menu');
  b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');m.classList.toggle('otwarte',o);});
  m.addEventListener('click',function(e){if(e.target.tagName==='A'){b.setAttribute('aria-expanded','false');m.classList.remove('otwarte');}});
  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();

  /* aktywna pozycja menu */
  var linki={};m.querySelectorAll('a').forEach(function(a){linki[a.getAttribute('href').slice(1)]=a;});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(w){w.forEach(function(x){if(x.isIntersecting){for(var k in linki)linki[k].classList.toggle('akt',k===x.target.id);}});},{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(linki).forEach(function(id){var s=document.getElementById(id);if(s)io.observe(s);});
  }

  /* mapa po zgodzie, wczytywana przy przewinięciu */
  var mapa=document.getElementById('mapa'),wczytana=false;
  function pokazMape(){if(wczytana||!mapa)return;wczytana=true;var f=document.createElement('iframe');f.src=mapa.getAttribute('data-src');f.title='Mapa: ul. Józefitów 4, Kraków';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';mapa.innerHTML='';mapa.appendChild(f);}
  function gdyWidoczna(){if(!mapa)return;if('IntersectionObserver' in window){var o=new IntersectionObserver(function(w){if(w[0].isIntersecting){o.disconnect();pokazMape();}},{rootMargin:'300px'});o.observe(mapa);}else pokazMape();}
  if(window.__imsZgoda)gdyWidoczna();

  /* baner cookies */
  var K='ims_cookies_v1',c=document.getElementById('cookies');
  c.addEventListener('click',function(e){var a=e.target.getAttribute('data-ck');if(!a)return;var tak=a==='tak';try{localStorage.setItem(K,JSON.stringify({mapa:tak,t:Date.now()}))}catch(er){}c.hidden=true;if(tak)gdyWidoczna();});
  document.querySelectorAll('[data-ck-ustawienia]').forEach(function(x){x.addEventListener('click',function(){c.hidden=false;});});
})();

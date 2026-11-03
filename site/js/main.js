/**
 * COMPORTAMIENTO DE LA PÁGINA
 * Carrito y mensaje de WhatsApp, menú del celular, animaciones.
 * Los datos (precios, productos, número de WhatsApp) NO están aquí:
 *   js/config.js    número, domicilio, extras, barrios, pagos
 *   js/productos.js menú
 */
(function(){
const CFG = window.FL_CONFIG;

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const lerp=(a,b,t)=>a+(b-a)*t, clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const fmt=n=>'$'+n.toLocaleString('es-CO');
const waLink=t=>`https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(t)}`;
const DOM=CFG.domicilio;
$$('.js-ig').forEach(a=>a.href=CFG.instagram);
$$('.js-wa').forEach(a=>a.href=waLink(a.dataset.text||'¡Hola!'));


/* ---------- productos (de js/productos.js) ---------- */
const P=window.FL_PRODUCTOS.map(x=>({id:x.id,n:x.nombre,s:x.detalle,p:x.precio,b:x.etiqueta,d:x.texto,bg:x.fondo,fg:x.letra,line:x.borde,
  a:x.foto?`<img src="${x.foto}" alt="${x.nombre}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:18px">`:x.dibujo}));

/* ---------- carrito ---------- */
let cart={};
try{cart=JSON.parse(localStorage.getItem('flCart')||'{}')||{}}catch(e){cart={}}
const save=()=>{try{localStorage.setItem('flCart',JSON.stringify(cart))}catch(e){}};

const stack=$('#stack');
P.forEach((x,i)=>{
  const el=document.createElement('article');
  el.className='card';el.style.setProperty('--i',i);el.style.background=x.bg;el.style.color=x.fg;
  if(x.line)el.style.boxShadow='inset 0 0 0 2px #f0d3d9, 0 -14px 34px -18px rgba(43,15,22,.45)';
  el.innerHTML=`<div class="meta">${x.b?`<span class="badge">${x.b}</span>`:''}<h3>${x.n}</h3><p class="sub">${x.s}</p><p class="desc">${x.d}</p>
   <div class="buy"><span class="price">${x.p?fmt(x.p):'<small>Precio según temporada</small>'}</span><span class="ctl" data-id="${x.id}"></span></div></div>
   <div class="art" aria-hidden="true">${x.a}</div>`;
  stack.appendChild(el);
});
function renderCtl(){
  $$('.ctl').forEach(c=>{
    const id=c.dataset.id,q=cart[id]||0,x=P.find(p=>p.id===id);
    c.innerHTML=q?`<span class="stepper"><button type="button" data-a="-" data-id="${id}" aria-label="Quitar uno de ${x.n}">−</button><output aria-live="polite">${q}</output><button type="button" data-a="+" data-id="${id}" aria-label="Agregar otro ${x.n}">+</button></span>`
      :`<button class="add${x.p?'':' ask'}" type="button" data-a="+" data-id="${id}">${x.p?'+ Agregar':'+ Preguntar'}</button>`;
  });
}
function totals(){
  let sub=0,n=0;Object.entries(cart).forEach(([id,q])=>{const x=P.find(p=>p.id===id);if(!x)return;n+=q;if(x.p)sub+=x.p*q});
  const ext=CFG.extras.reduce((s,x)=>s+($('#x-'+x.id).checked?x.precio:0),0);
  const dom=n===0?0:(sub+ext>=DOM.gratisDesde?0:DOM.costo);
  return{sub,n,ext,dom,tot:sub+ext+dom};
}
function renderItems(){
  const box=$('#items'),ids=Object.keys(cart).filter(k=>cart[k]>0);
  box.innerHTML=ids.length?ids.map(id=>{const x=P.find(p=>p.id===id);return `<div class="item"><div class="nm"><b>${x.n}</b><small>${x.s} · ${x.p?fmt(x.p):'precio por confirmar'}</small></div><span class="stepper"><button type="button" data-a="-" data-id="${id}" aria-label="Quitar uno de ${x.n}">−</button><output>${cart[id]}</output><button type="button" data-a="+" data-id="${id}" aria-label="Agregar otro ${x.n}">+</button></span></div>`}).join('')
   :`<div class="empty-state"><b>Aún no hay fresas aquí</b>Agrega algo desde el menú, o escríbenos directo y te ayudamos.</div>`;
}
function message(){
  const t=totals(),ids=Object.keys(cart).filter(k=>cart[k]>0);
  const zona=($('input[name=zona]:checked')||{}).value||'';
  const pago=($('input[name=pago]:checked')||{}).value||'';
  let m='¡Hola! Quiero hacer este pedido 🍓\n\n';
  ids.forEach(id=>{const x=P.find(p=>p.id===id);m+=`• ${cart[id]} x ${x.n} (${x.s})${x.p?' — '+fmt(x.p*cart[id]):' — precio por confirmar'}\n`});
  CFG.extras.forEach(x=>{if($('#x-'+x.id).checked)m+=`• ${x.nombre} — ${fmt(x.precio)}\n`});
  m+=`\nDomicilio: ${t.dom?fmt(t.dom):'gratis'}\nTotal: ${fmt(t.tot)}${ids.some(id=>!P.find(p=>p.id===id).p)?' + productos por confirmar':''}\n\n`;
  const nom=$('#fNombre').value.trim(),dir=$('#fDir').value.trim(),nota=$('#fNota').value.trim();
  if(nom)m+=`Nombre: ${nom}\n`;
  if(zona)m+=`Barrio: ${zona}\n`;
  if(dir)m+=`Dirección: ${dir}\n`;
  m+=`Para: ${$('#fCuando').value}\nPago: ${pago}\n`;
  if(nota)m+=`Nota: ${nota}\n`;
  return m;
}
function render(){
  renderCtl();renderItems();
  const t=totals();
  $('#count').textContent=t.n;
  $('#cartbar').classList.toggle('empty',!t.n);
  $('#cbTitle').textContent=t.n?`${t.n} ${t.n===1?'producto':'productos'} · ${fmt(t.tot)}`:'Tu pedido está vacío';
  $('#cbSub').textContent=t.n?(t.dom?`Te faltan ${fmt(DOM.gratisDesde-t.sub-t.ext)} para domicilio gratis`:'Domicilio gratis 🎉'):'Agrega algo del menú';
  $('#totals').innerHTML=`<div><span>Productos</span><b>${fmt(t.sub)}</b></div>${t.ext?`<div><span>Extras</span><b>${fmt(t.ext)}</b></div>`:''}<div><span>Domicilio</span><b>${t.n?(t.dom?fmt(t.dom):'Gratis'):'—'}</b></div><div class="t"><span>Total</span><span>${fmt(t.tot)}</span></div>${t.n&&t.dom?`<span class="hint">Agrega ${fmt(DOM.gratisDesde-t.sub-t.ext)} más y el domicilio es gratis.</span>`:''}`;
  const msg=message();$('#msgPreview').value=msg;$('#sendWa').href=waLink(msg);
  save();
}
function bump(){const c=$('#count');c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump')}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-a][data-id]');if(!b)return;
  const id=b.dataset.id;cart[id]=Math.max(0,(cart[id]||0)+(b.dataset.a==='+'?1:-1));if(!cart[id])delete cart[id];
  if(b.dataset.a==='+'){bump();toast(`${P.find(p=>p.id===id).n} agregada`);if(!RM)burst(b)}
  render();
});
$('#extrasOpts').innerHTML=CFG.extras.map(x=>`<label><input type="checkbox" id="x-${x.id}"><span>${x.nombre} · ${fmt(x.precio)}</span></label>`).join('');
$('#pagoOpts').innerHTML=CFG.pagos.map((z,i)=>`<label><input type="radio" name="pago" value="${z}" ${i===0?'checked':''}><span>${z}</span></label>`).join('');
$('#zonaOpts').innerHTML=CFG.zonas.map((z,i)=>`<label><input type="radio" name="zona" value="${z}" ${i===0?'checked':''}><span>${z}</span></label>`).join('');
$('#orderForm').addEventListener('input',render);$('#orderForm').addEventListener('change',render);
$('#orderForm').addEventListener('submit',e=>e.preventDefault());

/* sheet open/close */
const sheet=$('#sheet'),scrim=$('#scrim');
function openCart(){sheet.classList.add('on');scrim.classList.add('on');sheet.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>$('#closeCart').focus(),50)}
function closeCart(){sheet.classList.remove('on');scrim.classList.remove('on');sheet.setAttribute('aria-hidden','true');document.body.style.overflow=''}
$('#openCart').onclick=openCart;$('#openCart2').onclick=openCart;$('#closeCart').onclick=closeCart;scrim.onclick=closeCart;
addEventListener('keydown',e=>{if(e.key==='Escape'){closeCart();closeNav()}});
$('#sendWa').addEventListener('click',e=>{if(!totals().n){e.preventDefault();toast('Agrega al menos un producto');return}toast('Abriendo WhatsApp…')});
$('#copyMsg').onclick=()=>{const t=$('#msgPreview');const fb=()=>{t.hidden=false;t.focus();t.select();toast('Selecciona y copia el mensaje')};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t.value).then(()=>toast('Mensaje copiado. Pégalo en WhatsApp'),fb)}else fb()};

function toast(s){const t=$('#toast');t.textContent=s;t.classList.add('on');clearTimeout(toast.k);toast.k=setTimeout(()=>t.classList.remove('on'),1800)}

/* mini estallido de fresas al agregar */
function burst(b){const r=b.getBoundingClientRect();for(let i=0;i<6;i++){const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox','0 0 100 110');s.innerHTML='<use href="#fresa"/>';
  Object.assign(s.style,{position:'fixed',left:r.left+r.width/2-10+'px',top:r.top+r.height/2-10+'px',width:'20px',height:'22px',zIndex:95,pointerEvents:'none'});document.body.appendChild(s);
  const a=Math.random()*Math.PI*2,d=40+Math.random()*50;s.animate([{transform:'translate(0,0) scale(.6)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d-30}px) rotate(${Math.random()*180}deg) scale(1)`,opacity:0}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)'}).onfinish=()=>s.remove()}}

render();

/* ---------- nav hoja ---------- */
const nav=$('#sheetNav');
function openNav(){nav.classList.add('open');nav.setAttribute('aria-hidden','false');$('#openNav').setAttribute('aria-expanded','true')}
function closeNav(){nav.classList.remove('open');nav.setAttribute('aria-hidden','true');$('#openNav').setAttribute('aria-expanded','false')}
$('#openNav').onclick=openNav;$('#closeNav').onclick=closeNav;$$('#sheetNav a').forEach(a=>a.addEventListener('click',closeNav));

/* ---------- hero: título letra por letra ---------- */
(()=>{const k=$('#kin');let i=0;$$('.ln',k).forEach(l=>{l.innerHTML=[...l.textContent].map(c=>`<span class="ch" style="--i:${i++}">${c}</span>`).join('')});if(!RM)requestAnimationFrame(()=>k.classList.add('go'))})();

/* hero: capas con profundidad (mouse en escritorio, inclinación por scroll en móvil) */
(()=>{const art=$('#heroArt'),L=$$('.layer',art);let mx=0,my=0;
  addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;apply()},{passive:true});
  addEventListener('scroll',()=>{if(matchMedia('(pointer:coarse)').matches){my=clamp(scrollY/500,0,1)-.2;apply()}},{passive:true});
  function apply(){if(RM)return;L.forEach(l=>{const d=+l.dataset.d;l.style.transform=`translate(${-mx*d}px,${-my*d}px)`})}})();

/* hero: manchas líquidas */
(()=>{const box=$('.blobs'),hero=$('.hero');const B=[170,120,90,140,70].map((sz,i)=>{const b=document.createElement('div');b.className='blob';b.style.width=b.style.height=sz+'px';b.style.marginLeft=b.style.marginTop=-sz/2+'px';box.appendChild(b);return{el:b,ph:i*1.4,sp:.35+i*.07}});
  let t=0,vis=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(hero);
  (function loop(){if(vis){const w=hero.clientWidth,h=hero.clientHeight;t+=RM?0:.008;B.forEach(b=>{b.el.style.transform=`translate(${w*.5+Math.cos(t*b.sp+b.ph)*w*.4}px,${h*.5+Math.sin(t*b.sp*1.3+b.ph)*h*.35}px)`})}requestAnimationFrame(loop)})()})();

/* botón magnético */
$$('.mag').forEach(b=>{const s=$('span',b);b.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||RM)return;const r=b.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2;b.style.transform=`translate(${dx*.25}px,${dy*.35}px)`;s.style.transform=`translate(${dx*.1}px,${dy*.1}px)`});b.addEventListener('pointerleave',()=>{b.style.transform='';s.style.transform=''})});

/* cintas: más lentas al pasar */
(()=>{const m=$('.mq');m.addEventListener('pointerenter',()=>m.getAnimations({subtree:true}).forEach(a=>a.playbackRate=.3));m.addEventListener('pointerleave',()=>m.getAnimations({subtree:true}).forEach(a=>a.playbackRate=1))})();

/* header borde + menú apilado + sol del footer */
const cards=$$('.card'),hdr=$('#top'),sun=$('#sun'),foot=$('#foot');
function onScroll(){
  hdr.classList.toggle('scrolled',scrollY>10);
  if(!RM){cards.forEach((c,i)=>{const nx=cards[i+1];if(!nx){c.style.transform='';return}
    const a=c.getBoundingClientRect(),b=nx.getBoundingClientRect();const over=clamp(1-(b.top-a.top)/a.height,0,1);
    c.style.transform=`scale(${1-over*.05})`;c.style.filter=`brightness(${1-over*.18})`});
    const fr=foot.getBoundingClientRect();const p=clamp(1-fr.top/innerHeight,0,1);sun.style.transform=`translateY(${-p*48}%) rotate(${p*12-6}deg)`}
}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
if(RM)sun.style.transform='translateY(-40%)';

/* temporada: resalta el mes actual o el próximo */
(()=>{const m=new Date().getMonth()+1;const mos=$$('.mo');let best=mos.find(x=>+x.dataset.m===m);if(!best){best=mos.map(x=>({x,d:((+x.dataset.m-m)+12)%12})).sort((a,b)=>a.d-b.d)[0].x}best.classList.add('now');
  const g=$('#months');if(RM)return;const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){g.classList.add('reveal');io.disconnect()}},{threshold:.3});io.observe(g)})();

/* fondo que cambia de color por sección */
(()=>{const secs=$$('[data-bg]');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.body.style.backgroundColor=e.target.dataset.bg}),{rootMargin:'-45% 0px -45% 0px'});secs.forEach(s=>io.observe(s))})();

/* lluvia de fresas */
(()=>{const s=$('#rain'),cv=$('canvas',s),ctx=cv.getContext('2d');let W=0,H=0;const F=[];
  function size(){const r=s.getBoundingClientRect(),dpr=Math.min(2,devicePixelRatio||1);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  new ResizeObserver(size).observe(s);size();
  function fresa(x,y,r,a){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.scale(r/50,r/50);
    ctx.fillStyle='#e8183f';ctx.beginPath();ctx.moveTo(0,52);ctx.bezierCurveTo(-26,40,-42,14,-40,-8);ctx.bezierCurveTo(-38,-24,-24,-30,0,-26);ctx.bezierCurveTo(24,-30,38,-24,40,-8);ctx.bezierCurveTo(42,14,26,40,0,52);ctx.fill();
    ctx.fillStyle='#ffe08a';[[-16,-6],[2,-10],[18,-4],[-10,10],[10,10],[0,26]].forEach(([a,b])=>{ctx.beginPath();ctx.ellipse(a,b,2.4,3.6,0,0,7);ctx.fill()});
    ctx.fillStyle='#3A8D3F';ctx.beginPath();ctx.moveTo(0,-22);ctx.bezierCurveTo(-10,-34,-24,-32,-30,-26);ctx.bezierCurveTo(-20,-24,-12,-20,0,-18);ctx.bezierCurveTo(12,-20,20,-24,30,-26);ctx.bezierCurveTo(24,-32,10,-34,0,-22);ctx.fill();ctx.restore()}
  function add(x,y,n){for(let i=0;i<n;i++)F.push({x:x+(Math.random()-.5)*40,y,vx:(Math.random()-.5)*8,vy:-Math.random()*8-2,r:14+Math.random()*16,a:Math.random()*6,va:(Math.random()-.5)*.25});while(F.length>110)F.shift()}
  for(let i=0;i<11;i++)F.push({x:30+i*((W||340)/11),y:H-16,vx:0,vy:0,r:15+Math.random()*10,a:(Math.random()-.5),va:0});
  s.addEventListener('pointerdown',e=>{const r=s.getBoundingClientRect();add(e.clientX-r.left,e.clientY-r.top,RM?3:12)});
  let vis=false;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(s);
  (function loop(){if(vis||!F.length){ctx.clearRect(0,0,W,H);F.forEach(p=>{p.vy+=.38;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;
    if(p.y>H-p.r*.9){p.y=H-p.r*.9;p.vy*=-.42;p.vx*=.8;p.va*=.7}if(p.x<p.r||p.x>W-p.r){p.vx*=-.8;p.x=clamp(p.x,p.r,W-p.r)}fresa(p.x,p.y,p.r,p.a)})}requestAnimationFrame(loop)})()})();
})();

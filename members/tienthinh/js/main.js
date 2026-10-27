const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const sea=$('#bubbles');
for(let i=0;i<22;i++){const b=document.createElement('span'),s=10+Math.random()*50;
 b.className='rise';b.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${8+Math.random()*14}s;animation-delay:-${Math.random()*20}s`;sea.appendChild(b);}
$$('.bubble-cluster .bubble').forEach(b=>b.addEventListener('click',()=>{
 $('#bubbleText').textContent=b.dataset.text;b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop');}));
$('#burger').onclick=()=>$('#menu').classList.toggle('open');
$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
addEventListener('scroll',()=>{$('#nav').classList.toggle('scrolled',scrollY>50);$('#back').classList.toggle('show',scrollY>400);});
$('#back').onclick=()=>scrollTo({top:0,behavior:'smooth'});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
 e.target.classList.add('in');e.target.querySelectorAll('i[data-w]').forEach(i=>i.style.width=i.dataset.w+'%');
 $$('#menu a').forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id));}),{threshold:.25});
$$('section').forEach(s=>io.observe(s));
$('#form').addEventListener('submit',e=>{e.preventDefault();let ok=true;
 const rules=[['name',v=>v.length>=2,'Vui lòng nhập họ tên (từ 2 ký tự).'],
  ['email',v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),'Email không hợp lệ.'],
  ['msg',v=>v.length>=10,'Nội dung cần ít nhất 10 ký tự.']];
 rules.forEach(([id,test,msg])=>{const el=$('#'+id),good=test(el.value.trim());
  el.classList.toggle('bad',!good);$('#e-'+id).textContent=good?'':msg;ok=ok&&good;});
 $('#ok').hidden=!ok;if(ok){e.target.reset();setTimeout(()=>$('#ok').hidden=true,4000);}});

// Ocean Bubble Preloader
(() => {
  const p = $('#ocean-preloader');
  if (!p) return;
  const fill = $('#ocean-fill'), pct = $('#ocean-percent'), st = $('#ocean-status');
  let cur = 0;
  const start = performance.now(), minTime = 1000;
  const msgs = [
    { at: 0, t: 'KHỞI TẠO BUBBLE SEA...' },
    { at: 35, t: 'NẠP DỮ LIỆU ĐÁY BIỂN...' },
    { at: 70, t: 'KẾT NỐI HỒ SƠ TIẾN THỊNH...' },
    { at: 92, t: 'HỆ THỐNG SẴN SÀNG! 🫧' }
  ];
  let docLoaded = document.readyState === 'complete';
  if (!docLoaded) window.addEventListener('load', () => docLoaded = true);

  const t = setInterval(() => {
    const el = performance.now() - start;
    let tgt = Math.min((el / minTime) * 100, 95);
    if (docLoaded && el >= minTime) tgt = 100;
    if (cur < tgt) {
      cur += (tgt - cur) * 0.2 + 0.8;
      if (cur > tgt) cur = tgt;
    }
    if (fill) fill.style.width = cur + '%';
    if (pct) pct.textContent = Math.floor(cur) + '%';
    if (st) {
      for (let i = msgs.length - 1; i >= 0; i--) {
        if (cur >= msgs[i].at) { st.textContent = msgs[i].t; break; }
      }
    }
    if (cur >= 100) {
      clearInterval(t);
      setTimeout(() => {
        p.classList.add('is-loaded');
        setTimeout(() => p.remove(), 600);
      }, 200);
    }
  }, 20);
  setTimeout(() => {
    if (!p.classList.contains('is-loaded')) {
      clearInterval(t);
      p.classList.add('is-loaded');
      setTimeout(() => p.remove(), 600);
    }
  }, 2400);
})();

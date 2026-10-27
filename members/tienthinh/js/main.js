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

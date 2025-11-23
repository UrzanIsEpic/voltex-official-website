// core interactions: populate products, tilt interaction, hero parallax, modal / buy mockup

document.getElementById('year').textContent = new Date().getFullYear();

// PRODUCT DATA (images use the uploaded logo as placeholder; replace with real product shots if you have them)
const products = [
  {title:'VortexX CPU', subtitle:'Project Helios — Desktop CPU', img:'/mnt/data/5982c694-ce3a-4c7a-a6df-1815751eaac5.png', tag:'Silicon Labs'},
  {title:'TitanGPU', subtitle:'AI-accelerated GPU', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=60', tag:'Silicon Labs'},
  {title:'NanoFlux Mobile', subtitle:'Mobile SoC for Nova phones', img:'/mnt/data/5982c694-ce3a-4c7a-a6df-1815751eaac5.png', tag:'Voltex Mobile'},
  {title:'VisionX TV', subtitle:'Neural-upscaling 8K TV', img:'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1400&q=60', tag:'Voltex Vision'},
  {title:'IGNITE Console', subtitle:'CoreFusion APU console', img:'/mnt/data/5982c694-ce3a-4c7a-a6df-1815751eaac5.png', tag:'Gaming'},
];

// mount product cards
const grid = document.getElementById('productsGrid');
products.forEach((p, i)=>{
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <img class="thumb" src="${p.img}" alt="${p.title} image" />
    <h4>${p.title}</h4>
    <div class="meta">${p.subtitle}</div>
    <div class="cta-row">
      <button class="btn btn-small" data-buy="${i}">Buy Now</button>
      <a class="btn btn-small btn-outline" href="products.html">Learn →</a>
    </div>
  `;
  // tilt effect (mouse)
  card.addEventListener('mousemove', (evt)=>{
    const rect = card.getBoundingClientRect();
    const x = (evt.clientX - rect.left) / rect.width - 0.5;
    const y = (evt.clientY - rect.top) / rect.height - 0.5;
    const rx = (-y) * 8;
    const ry = (x) * 12;
    card.style.transform = `translateZ(20px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
    card.style.boxShadow = `0 40px 80px rgba(0,0,0,0.6), 0 12px 40px rgba(0,168,255,0.06)`;
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = '';
    card.style.boxShadow = '';
  });

  grid.appendChild(card);
});

// HERO PARALLAX (subtle) — mouse move changes scene rotation
const scene = document.getElementById('scene');
const hero = document.getElementById('hero');
hero.addEventListener('mousemove', (e)=>{
  const rect = hero.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.top + rect.height/2;
  const dx = (e.clientX - cx) / rect.width;
  const dy = (e.clientY - cy) / rect.height;
  const rx = dy * 6;
  const ry = dx * -10;
  scene.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
});

// BUY NOW modal behavior
const modal = document.getElementById('modal');
const buyNowBtns = document.querySelectorAll('[data-buy], #buyNowHero');
buyNowBtns.forEach(b=>{
  b.addEventListener('click', ()=> openModal());
});
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalCancel').addEventListener('click', closeModal);

function openModal(){
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){
  modal.setAttribute('aria-hidden','true');
}

// form submit demo
document.getElementById('buyForm')?.addEventListener('submit',(e)=>{
  e.preventDefault();
  const name = e.target.name.value || 'you';
  alert(`Thanks ${name}! This is a demo preorder. We'll email you when sample boards are available.`);
  closeModal();
});

// INVESTOR kit button
document.getElementById('investBtn')?.addEventListener('click', ()=>{
  alert('Investor kit requested — this is a demo. Email investor@voltex.example for real requests.');
});

// Accessible ESC close
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeModal();
});

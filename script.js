// clean interactive behaviors: populate products, scroll reveal, modal, CTA
document.getElementById('year').textContent = new Date().getFullYear();

// Product data (external Unsplash images). If you want them local, download to /assets/.
const products = [
  {title:'VortexX CPU', subtitle:'Project Helios — Desktop CPU', img:'https://images.unsplash.com/photo-1581091215367-07a3f1d9d2c7?auto=format&fit=crop&w=1400&q=60', tag:'Silicon Labs'},
  {title:'TitanGPU', subtitle:'AI-accelerated GPU', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=60', tag:'Silicon Labs'},
  {title:'NanoFlux Mobile', subtitle:'Mobile SoC for Nova phones', img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&q=60', tag:'Voltex Mobile'},
  {title:'VisionX TV', subtitle:'Neural-upscaling 8K TV', img:'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1400&q=60', tag:'Voltex Vision'},
  {title:'IGNITE Console', subtitle:'CoreFusion APU console', img:'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=60', tag:'Gaming'},
];

// mount product cards
(function mountProducts(){
  const grid = document.getElementById('productsGrid');
  if(!grid) return;
  products.forEach((p)=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img class="thumb" src="${p.img}" alt="${p.title}" loading="lazy" />
      <h4>${p.title}</h4>
      <div class="meta">${p.subtitle}</div>
      <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center">
        <button class="btn btn-primary btn-small" data-title="${p.title}">Buy Now</button>
        <a class="btn btn-outline btn-small" href="products.html">Learn →</a>
      </div>
    `;
    grid.appendChild(card);
  });
})();

// Modal behaviour
const modal = document.getElementById('modal');
const buyNowBtns = document.querySelectorAll('[data-title], #buyNowHero');
buyNowBtns.forEach(b=> {
  b.addEventListener('click', ()=> openModal());
});
document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('modalCancel')?.addEventListener('click', closeModal);

function openModal(){
  modal?.setAttribute('aria-hidden','false');
  // focus first input
  setTimeout(()=> modal?.querySelector('input')?.focus(), 120);
}
function closeModal(){
  modal?.setAttribute('aria-hidden','true');
}

// demo form submit
document.getElementById('buyForm')?.addEventListener('submit',(e)=>{
  e.preventDefault();
  const name = e.target.name.value || 'Friend';
  alert(`Thanks ${name}! (Demo preorder received.)`);
  closeModal();
});

// CTA join
document.getElementById('joinBtn')?.addEventListener('click', ()=>{
  const email = document.getElementById('ctaEmail')?.value || '';
  if(!email || !email.includes('@')) return alert('Please enter a valid email.');
  alert(`Thanks! ${email} — we'll keep you updated.`);
  document.getElementById('ctaEmail').value = '';
});

// lightweight scroll reveal for .card and .chip-card
if('IntersectionObserver' in window){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting) ent.target.classList.add('reveal');
    });
  }, {threshold:0.08});
  document.querySelectorAll('.card, .chip-card').forEach(el=> obs.observe(el));
} else {
  // fallback: just add reveal
  document.querySelectorAll('.card, .chip-card').forEach(el=> el.classList.add('reveal'));
}

// keyboard ESC closes modal
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeModal();
});

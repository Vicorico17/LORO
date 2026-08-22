const creators = [
  {name:'Maya Chen', niche:'Wellness · Lifestyle', reach:'1.2m', share:'72%', trained:'Ready', image:'assets/mara-campaign.png', pos:'65% 20%'},
  {name:'Theo Brooks', niche:'Travel · Outdoors', reach:'840k', share:'65%', trained:'Ready', gradient:'linear-gradient(145deg,#d7b895 0%,#805a49 55%,#2f3530 100%)'},
  {name:'Lina Ortiz', niche:'Beauty · Skincare', reach:'610k', share:'70%', trained:'Ready', gradient:'linear-gradient(145deg,#e3c0ad,#966b61 55%,#372b2b)'},
  {name:'Jamal Rivers', niche:'Fitness · Performance', reach:'480k', share:'68%', trained:'Training 82%', gradient:'linear-gradient(145deg,#c5a27d,#735341 60%,#28312d)'},
  {name:'Sofia Park', niche:'Food · Home', reach:'390k', share:'70%', trained:'Ready', gradient:'linear-gradient(145deg,#e1cfb4,#a57456 56%,#5c6c55)'},
  {name:'Noah Reid', niche:'Style · Design', reach:'315k', share:'64%', trained:'Ready', gradient:'linear-gradient(145deg,#c9baa2,#76695d 50%,#353a37)'}
];

const grid = document.querySelector('#creatorGrid');
if(grid){
  grid.innerHTML = creators.map(c => `<article class="creator-card"><div class="creator-image" style="${c.image ? `background-image:url('${c.image}');background-position:${c.pos}` : `background:${c.gradient}`}"><span class="available">● CONSENT ACTIVE</span></div><div class="creator-info"><h3>${c.name}</h3><p>${c.niche}</p><div class="creator-meta"><span>AUDIENCE<b>${c.reach}</b></span><span>CREATOR SHARE<b>${c.share}</b></span><span>LORA STATUS<b>${c.trained}</b></span></div></div></article>`).join('');
}

const pages = [...document.querySelectorAll('.page')];
const navItems = [...document.querySelectorAll('.nav-item')];
function showPage(id){
  const target = document.getElementById(id);
  if(!target) return;
  pages.forEach(p => p.classList.toggle('active', p === target));
  navItems.forEach(n => n.classList.toggle('active', n.dataset.page === id));
  window.scrollTo({top:0, behavior:'smooth'});
}
navItems.forEach(item => item.addEventListener('click', e => { e.preventDefault(); const id=item.dataset.page; if(id==='studio') openModal(); else showPage(id); }));
document.querySelectorAll('[data-target]').forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.target)));

const modal = document.querySelector('#studioModal');
function openModal(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
document.querySelector('#createAdBtn').addEventListener('click', openModal);
document.querySelectorAll('.open-studio').forEach(b => b.addEventListener('click', openModal));
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-close-btn').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

const toast = document.querySelector('#toast');
document.querySelector('#continueBtn').addEventListener('click', () => {
  closeModal(); toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3200);
});
document.querySelector('#searchBtn').addEventListener('click', () => {
  showPage('creators'); setTimeout(() => toast.classList.add('show'),150); setTimeout(() => toast.classList.remove('show'),2800);
});

const pickCount = document.querySelector('#pickCount');
const opportunityCards = [...document.querySelectorAll('.opportunity-card')];
const selectedCampaigns = new Set();

function updatePickCount(){
  pickCount.textContent = `${selectedCampaigns.size} selected`;
}

opportunityCards.forEach(card => card.querySelector('.pick-btn').addEventListener('click', () => {
  const campaign = card.dataset.campaign;
  const selected = selectedCampaigns.has(campaign);
  if(selected) selectedCampaigns.delete(campaign);
  else selectedCampaigns.add(campaign);
  card.classList.toggle('selected', !selected);
  card.querySelector('.pick-icon').textContent = selected ? '＋' : '✓';
  card.querySelector('.pick-label').textContent = selected ? 'Pick campaign' : 'Selected';
  updatePickCount();
  toast.querySelector('b').textContent = selected ? 'Campaign removed' : 'Campaign selected';
  toast.querySelector('small').textContent = selected ? 'You can pick it again any time.' : 'The brand will review your application.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}));

document.querySelectorAll('.more-btn').forEach(btn => btn.addEventListener('click', () => { toast.querySelector('b').textContent='Campaign actions opened'; toast.querySelector('small').textContent='Reporting, duplicate, and archive are available.'; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2600); }));

const intro=document.getElementById("intro");
const lobby=document.getElementById("lobby");
const toast=document.getElementById("toast");
const introReveal=document.querySelector(".intro-reveal");
intro.addEventListener("mousemove",(e)=>{
 const r=intro.getBoundingClientRect();
 intro.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");
 intro.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%");
});
intro.addEventListener("mouseleave",()=>{
 intro.style.removeProperty("--mx");
 intro.style.removeProperty("--my");
});


document.querySelector(".enter").addEventListener("click",()=>{
 intro.style.opacity="0";
 intro.style.pointerEvents="none";
 lobby.style.opacity="1";
 lobby.style.pointerEvents="auto";
 lobby.style.transform="scale(1)";
});


function closePanels(){
 document.querySelectorAll(".panel").forEach(p=>p.classList.remove("open"));
}

function showToast(text){
 toast.textContent=text;
 toast.classList.add("show");
 clearTimeout(window._toastTimer);
 window._toastTimer=setTimeout(()=>toast.classList.remove("show"),1400);
}

document.querySelectorAll("[data-panel]").forEach(btn=>{
 btn.addEventListener("click",()=>{
   closePanels();
   const panel=document.getElementById(btn.dataset.panel);
   if(panel) panel.classList.add("open");
 });
});

document.querySelectorAll("[data-toast]").forEach(btn=>{
 btn.addEventListener("click",()=>showToast(btn.dataset.toast));
});

document.querySelectorAll(".close").forEach(btn=>{
 btn.addEventListener("click",closePanels);
});

(() => {
  const gallery = document.getElementById('heroesGallery');
  const close = gallery?.querySelector('.heroes-close');
  if (!gallery || !close) return;

  const open = (e) => {
    if (e) e.preventDefault();
    gallery.classList.add('open');
    gallery.setAttribute('aria-hidden','false');
  };
  const hide = () => {
    gallery.classList.remove('open');
    gallery.setAttribute('aria-hidden','true');
  };

  // Find the existing HEROES control in the current Space.
  const controls = [...document.querySelectorAll('button,a,[role="button"],.hotspot')];
  const hero = controls.find(el => {
    const label = (el.getAttribute('aria-label') || '').trim().toLowerCase();
    const text = (el.textContent || '').trim().toLowerCase();
    const cls = String(el.className || '').toLowerCase();
    return label === 'heroes' || text === 'heroes' || cls.includes('heroes');
  });

  if (hero) hero.addEventListener('click', open);
  close.addEventListener('click', hide);
  gallery.addEventListener('click', e => { if (e.target === gallery) hide(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
})();
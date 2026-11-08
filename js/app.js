(function () {
  const D = window.VELLAR;
  const $ = (s) => document.querySelector(s);
  const wa = (msg) => `https://wa.me/${D.whatsapp.concierge}?text=${encodeURIComponent(msg)}`;

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  const observeReveals = (root = document) => root.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));

  /* ---------- Áudio de boas-vindas ---------- */
  const audio = $('#welcomeAudio');
  const btn = $('#audioBtn');
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  let demo = null; // modo demonstração enquanto o arquivo real não existe
  let audioMissing = false;
  audio.addEventListener('error', () => { audioMissing = true; });

  function setPlaying(on) {
    $('#iconPlay').classList.toggle('hidden', on);
    $('#iconPause').classList.toggle('hidden', !on);
    $('#wave').classList.toggle('playing', on);
    btn.setAttribute('aria-label', on ? 'Pausar áudio' : 'Reproduzir áudio de boas-vindas');
  }
  function render(cur, dur) {
    $('#audioProgress').style.width = `${(cur / dur) * 100 || 0}%`;
    $('#audioTime').textContent = fmt(cur);
  }

  function toggleDemo() {
    if (!demo) demo = { t: 0, dur: 45, id: null };
    if (demo.id) { clearInterval(demo.id); demo.id = null; setPlaying(false); return; }
    setPlaying(true);
    demo.id = setInterval(() => {
      demo.t += 0.25;
      if (demo.t >= demo.dur) { demo.t = 0; clearInterval(demo.id); demo.id = null; setPlaying(false); }
      render(demo.t, demo.dur);
    }, 250);
  }

  btn.addEventListener('click', async () => {
    if (audioMissing || demo) { if (!demo) toast('Prévia: adicione o áudio em assets/audio'); return toggleDemo(); }
    if (audio.paused) {
      try { await audio.play(); setPlaying(true); }
      catch { audioMissing = true; toast('Prévia: adicione o áudio em assets/audio'); toggleDemo(); }
    } else { audio.pause(); setPlaying(false); }
  });
  audio.addEventListener('timeupdate', () => render(audio.currentTime, audio.duration));
  audio.addEventListener('ended', () => { setPlaying(false); render(0, 1); });
  $('#audioBar').addEventListener('click', (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const p = (e.clientX - r.left) / r.width;
    if (demo) { demo.t = p * demo.dur; render(demo.t, demo.dur); }
    else if (audio.duration) audio.currentTime = p * audio.duration;
  });

  /* ---------- Comunidade & benefícios ---------- */
  const track = $('#benefitsTrack');
  const dots = $('#benefitsDots');

  function benefitCard(b) {
    return `
      <article class="benefit-card snap-start shrink-0 w-[78%] max-w-[300px] rounded-2xl border border-sand/10 bg-charcoal p-5">
        <div class="flex items-center justify-between">
          <span class="grid place-items-center w-10 h-10 rounded-full border border-gold/30 text-gold text-lg">${b.icon}</span>
          <span class="rounded-full border border-gold/50 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.2em] text-gold">${b.tier}</span>
        </div>
        <p class="mt-5 text-[11px] uppercase tracking-[0.25em] text-smoke">${b.category}</p>
        <p class="mt-1 text-beige font-medium">${b.partner}</p>
        <p class="mt-4 font-serif text-3xl text-sand">${b.perk}</p>
        <p class="text-sm text-smoke">${b.detail}</p>
        <button class="use-benefit tap mt-5 w-full rounded-full border border-sand/20 py-2.5 text-xs uppercase tracking-[0.2em] text-sand hover:bg-sand hover:text-obsidian" data-partner="${b.partner}">Usar benefício</button>
      </article>`;
  }

  function renderCommunity(key) {
    const c = D.communities[key];
    track.classList.remove('fade-swap'); void track.offsetWidth; track.classList.add('fade-swap');
    track.innerHTML = c.benefits.map(benefitCard).join('') + '<div class="shrink-0 w-2"></div>';
    track.scrollLeft = 0;
    track.dispatchEvent(new Event('scroll'));
    dots.innerHTML = c.benefits.map((_, i) => `<span class="dot${i === 0 ? ' active' : ''}"></span>`).join('');
    $('#communityTags').textContent = c.tags;
    $('#whatsCommunity').href = c.groupLink;
    $('#whatsCommunityLabel').textContent = 'Entrar na Comunidade no WhatsApp';
    document.querySelectorAll('.seg-btn').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.community === key)));
    $('#segIndicator').classList.toggle('right', key === 'feminina');
    try { localStorage.setItem('vellar-community', key); } catch {}
  }

  track.addEventListener('scroll', () => {
    const cards = track.querySelectorAll('.benefit-card');
    if (!cards.length) return;
    const step = cards[0].offsetWidth + 16;
    const i = Math.min(cards.length - 1, Math.round(track.scrollLeft / step));
    dots.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', i === j));
  }, { passive: true });

  track.addEventListener('click', (e) => {
    const b = e.target.closest('.use-benefit');
    if (!b) return;
    b.textContent = '✓ Apresente no parceiro';
    b.classList.add('bg-sand', 'text-obsidian');
    toast(`Benefício ${b.dataset.partner} ativado`);
  });

  document.querySelectorAll('.seg-btn').forEach((b) => b.addEventListener('click', () => renderCommunity(b.dataset.community)));

  let saved = 'masculina';
  try { saved = localStorage.getItem('vellar-community') || saved; } catch {}
  renderCommunity(D.communities[saved] ? saved : 'masculina');

  /* ---------- Vitrine de peças ---------- */
  $('#productsTrack').innerHTML = D.products.map((p) => `
    <article class="product-card snap-start shrink-0 w-[62%] max-w-[240px]">
      <div class="relative aspect-[4/5] rounded-2xl overflow-hidden border border-sand/10 bg-charcoal">
        <div class="photo ${p.photo} absolute inset-0" ${p.image ? `style="background-image:url('${p.image}')"` : ''}></div>
      </div>
      <p class="mt-3 text-beige text-sm font-medium">${p.name}</p>
      <p class="text-[11px] text-smoke">${p.material}</p>
      <div class="mt-2 flex items-center justify-between">
        <span class="font-serif text-sand">${p.price}</span>
        <a href="${wa(D.whatsapp.reservaMsg + p.name)}" target="_blank" rel="noopener"
           class="tap rounded-full bg-sand px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-obsidian hover:bg-gold">Reservar</a>
      </div>
    </article>`).join('') + '<div class="shrink-0 w-2"></div>';

  /* ---------- Flechas sobrepostas aos carrosséis ---------- */
  function updateArrows(t) {
    const max = t.scrollWidth - t.clientWidth - 4;
    document.querySelectorAll(`.carousel-nav[data-target="${t.id}"]`).forEach((b) => {
      const hide = b.dataset.dir === '-1' ? t.scrollLeft <= 4 : t.scrollLeft >= max;
      b.classList.toggle('is-hidden', hide);
    });
  }
  function centerProductArrows() {
    const img = document.querySelector('#productsTrack .product-card > div');
    if (img) document.querySelector('#productsTrack').parentElement.style.setProperty('--img-mid', `${img.offsetHeight / 2}px`);
  }

  document.querySelectorAll('.carousel-nav').forEach((b) => b.addEventListener('click', () => {
    const t = document.getElementById(b.dataset.target);
    const card = t.firstElementChild;
    t.scrollBy({ left: (card.offsetWidth + 16) * Number(b.dataset.dir), behavior: 'smooth' });
  }));

  ['benefitsTrack', 'productsTrack'].forEach((id) => {
    const t = document.getElementById(id);
    t.addEventListener('scroll', () => updateArrows(t), { passive: true });
    updateArrows(t);
  });
  window.addEventListener('resize', () => {
    centerProductArrows();
    updateArrows(track); updateArrows($('#productsTrack'));
  });
  centerProductArrows();
  // Recalcula quando o layout final (fontes/Tailwind) assentar
  const firstImg = document.querySelector('#productsTrack .product-card > div');
  if (firstImg && 'ResizeObserver' in window) new ResizeObserver(centerProductArrows).observe(firstImg);

  /* ---------- Vídeo da campanha ---------- */
  const video = $('#campaignVideo');
  $('#videoBtn').addEventListener('click', async () => {
    try {
      video.controls = true;
      await video.play();
      $('#videoCover').classList.add('hidden');
    } catch {
      video.controls = false;
      toast('Prévia: adicione o vídeo em assets/video');
    }
  });

  /* ---------- Concierge & rodapé ---------- */
  $('#concierge').href = wa(D.whatsapp.conciergeMsg);
  $('#year').textContent = new Date().getFullYear();

  observeReveals();
})();

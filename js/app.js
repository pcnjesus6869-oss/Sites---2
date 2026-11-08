(function () {
  const D = window.VELLAR;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const wa = (msg) => `https://wa.me/${D.whatsapp.number}?text=${encodeURIComponent(msg)}`;
  const icon = (id, cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const today = new Date();

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ================= 1. SOBRE NÓS (MP3 ou MP4) ================= */
  function renderAbout() {
    const a = D.about;
    $('#aboutTitle').textContent = a.title;
    $('#aboutSubtitle').textContent = a.subtitle;
    $('#aboutText').textContent = a.text;
    const box = $('#aboutPlayer');
    if (a.type === 'video') renderVideoPlayer(box, a); else renderAudioPlayer(box, a);
  }

  function renderAudioPlayer(box, a) {
    box.innerHTML = `
      <div class="rounded-2xl border border-sand/10 bg-charcoal p-4 flex items-center gap-4">
        <button data-play class="tap shrink-0 grid place-items-center w-12 h-12 rounded-full bg-sand text-obsidian" aria-label="Reproduzir áudio">
          ${icon('play', 'w-5 h-5 ml-0.5 i-play')}${icon('pause', 'w-5 h-5 hidden i-pause')}
        </button>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-beige truncate">${esc(a.label)}</p>
          <p class="text-[11px] text-smoke">${esc(a.subtitle)}</p>
          <div class="mt-2 flex items-center gap-2">
            <div data-bar class="relative flex-1 h-1 rounded-full bg-sand/10 cursor-pointer"><div data-progress class="absolute inset-y-0 left-0 w-0 rounded-full bg-gold"></div></div>
            <span data-time class="text-[10px] tabular-nums text-smoke">0:00</span>
          </div>
        </div>
        <div data-wave class="wave flex items-end gap-[3px] h-6" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
        <audio preload="metadata" src="${esc(a.src)}"></audio>
      </div>`;

    const audio = $('audio', box), btn = $('[data-play]', box);
    const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
    let missing = false, demo = null;
    audio.addEventListener('error', () => { missing = true; });

    const setPlaying = (on) => {
      $('.i-play', box).classList.toggle('hidden', on);
      $('.i-pause', box).classList.toggle('hidden', !on);
      $('[data-wave]', box).classList.toggle('playing', on);
      btn.setAttribute('aria-label', on ? 'Pausar áudio' : 'Reproduzir áudio');
    };
    const render = (cur, dur) => {
      $('[data-progress]', box).style.width = `${(cur / dur) * 100 || 0}%`;
      $('[data-time]', box).textContent = fmt(cur);
    };
    // Modo prévia enquanto o MP3 não existir
    const toggleDemo = () => {
      if (!demo) { demo = { t: 0, dur: 45, id: null }; toast('Prévia: adicione o MP3 em assets/media'); }
      if (demo.id) { clearInterval(demo.id); demo.id = null; return setPlaying(false); }
      setPlaying(true);
      demo.id = setInterval(() => {
        demo.t += 0.25;
        if (demo.t >= demo.dur) { demo.t = 0; clearInterval(demo.id); demo.id = null; setPlaying(false); }
        render(demo.t, demo.dur);
      }, 250);
    };

    btn.addEventListener('click', async () => {
      if (missing || demo) return toggleDemo();
      if (audio.paused) {
        try { await audio.play(); setPlaying(true); } catch { missing = true; toggleDemo(); }
      } else { audio.pause(); setPlaying(false); }
    });
    audio.addEventListener('timeupdate', () => render(audio.currentTime, audio.duration));
    audio.addEventListener('ended', () => { setPlaying(false); render(0, 1); });
    $('[data-bar]', box).addEventListener('click', (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      const p = (e.clientX - r.left) / r.width;
      if (demo) { demo.t = p * demo.dur; render(demo.t, demo.dur); }
      else if (audio.duration) audio.currentTime = p * audio.duration;
    });
  }

  function renderVideoPlayer(box, a) {
    box.innerHTML = `
      <div class="relative aspect-[4/5] sm:aspect-video rounded-2xl overflow-hidden border border-sand/10 bg-charcoal">
        <video class="absolute inset-0 w-full h-full object-cover" playsinline preload="metadata" poster="${esc(a.poster)}" src="${esc(a.src)}"></video>
        <div data-cover class="absolute inset-0 photo flex flex-col justify-end p-5" style="background-image:url('${esc(a.poster)}')">
          <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent"></div>
          <button data-play class="tap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-16 h-16 rounded-full border border-sand/40 bg-obsidian/40 backdrop-blur text-sand" aria-label="Assistir vídeo">
            ${icon('play', 'w-6 h-6 ml-1')}
          </button>
          <div class="relative">
            <p class="font-serif text-lg text-sand">${esc(a.label)}</p>
            <p class="text-xs text-smoke mt-1">${esc(a.subtitle)}</p>
          </div>
        </div>
      </div>`;
    const video = $('video', box);
    $('[data-play]', box).addEventListener('click', async () => {
      try {
        video.controls = true;
        await video.play();
        $('[data-cover]', box).classList.add('hidden');
      } catch {
        video.controls = false;
        toast('Prévia: adicione o MP4 em assets/media');
      }
    });
  }

  /* ================= 2. CONTEÚDOS EXCLUSIVOS ================= */
  function renderContents() {
    const c = D.contents;
    $('#contentMonth').textContent = c.month;
    $('#contentIntro').textContent = c.intro;
    const covers = ['photo-3', 'photo-2', 'photo-5', 'photo-1', 'photo-6'];
    $('#contentTrack').innerHTML = c.items.map((it, i) => {
      const rel = new Date(`${it.release}T00:00:00-03:00`);
      const open = today >= rel;
      const when = rel.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      return `
      <article class="content-card snap-start shrink-0 w-[78%] max-w-[300px] rounded-2xl border border-sand/10 bg-charcoal overflow-hidden ${open ? '' : 'is-locked'}">
        <div data-media class="relative aspect-[16/10] photo ${covers[i % covers.length]}">
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent"></div>
          <span class="absolute top-3 left-3 rounded-full bg-obsidian/70 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-sand">${esc(it.week)}</span>
          <span class="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${open ? 'bg-gold text-obsidian' : 'bg-obsidian/70 text-smoke border border-sand/15'}">${open ? 'Liberado' : 'Em breve'}</span>
          <span class="absolute bottom-2 left-4 font-serif text-5xl text-sand/20">${String(i + 1).padStart(2, '0')}</span>
        </div>
        <div class="p-5 pt-3">
          <p class="text-[11px] uppercase tracking-[0.25em] text-gold">${esc(it.stage)}</p>
          <p class="mt-2 text-beige font-medium leading-snug min-h-[66px]">${esc(it.title)}</p>
          <p class="mt-2 text-xs text-smoke">${esc(it.format)}</p>
          <button class="content-open tap mt-4 w-full rounded-full py-2.5 text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 ${open ? 'bg-sand text-obsidian font-semibold' : 'border border-sand/15 text-smoke'}" data-open="${open}" data-url="${esc(it.url)}" data-when="${when}">
            ${open ? icon('play', 'w-3.5 h-3.5') + ' Acessar' : icon('lock', 'w-3.5 h-3.5') + ' Libera em ' + when}
          </button>
        </div>
      </article>`;
    }).join('') + '<div class="shrink-0 w-2"></div>';

    $('#contentTrack').addEventListener('click', (e) => {
      const b = e.target.closest('.content-open');
      if (!b) return;
      if (b.dataset.open !== 'true') return toast(`Este conteúdo libera em ${b.dataset.when}`);
      if (b.dataset.url) window.open(b.dataset.url, '_blank', 'noopener');
      else toast('Link do conteúdo ainda não configurado');
    });
  }

  /* ================= 3. BASTIDORES ================= */
  function renderBastidores() {
    const b = D.bastidores;
    $('#bastidoresAll').href = b.profile;
    $('#bastidoresTrack').innerHTML = b.items.map((it) => `
      <a href="${esc(it.url)}" target="_blank" rel="noopener" class="reel-card tap snap-start shrink-0 w-[46%] max-w-[210px] block">
        <div data-media class="relative aspect-[9/16] rounded-2xl overflow-hidden border border-sand/10 bg-charcoal">
          <img src="${esc(it.thumb)}" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent"></div>
          <span class="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-full bg-obsidian/60 backdrop-blur text-sand">${icon('play', 'w-3.5 h-3.5 ml-0.5')}</span>
          <div class="absolute bottom-0 inset-x-0 p-3">
            <p class="text-[13px] leading-snug text-beige font-medium">${esc(it.headline)}</p>
            <p class="mt-1.5 flex items-center gap-1.5 text-[10px] text-smoke">${icon('ig', 'w-3 h-3')} ${esc(it.date || 'Reels')}</p>
          </div>
        </div>
      </a>`).join('') + `
      <a href="${esc(b.profile)}" target="_blank" rel="noopener" class="reel-card tap snap-start shrink-0 w-[46%] max-w-[210px] block">
        <div data-media class="relative aspect-[9/16] rounded-2xl border border-dashed border-gold/40 bg-charcoal/60 grid place-items-center text-center p-4">
          <div>
            <span class="mx-auto grid place-items-center w-12 h-12 rounded-full border border-gold/40 text-gold">${icon('ig', 'w-5 h-5')}</span>
            <p class="mt-4 font-serif text-sand">Ver todos os bastidores</p>
            <p class="mt-1 text-[11px] text-smoke">@comunidadevellar</p>
          </div>
        </div>
      </a>
      <div class="shrink-0 w-2"></div>`;
  }

  /* ================= 4. PARCEIROS ================= */
  const tierBadge = (t) => `<span class="tier tier-${esc(t)}">${esc(t)}</span>`;

  function renderFeaturedPartner() {
    const p = D.featuredPartner;
    $('#featuredPartner').innerHTML = `
      <div class="relative aspect-[16/10] photo" style="background-image:url('${esc(p.cover)}')">
        <span class="absolute top-3 left-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-obsidian">Parceiro em destaque</span>
      </div>
      <div class="p-5">
        <p class="text-[11px] uppercase tracking-[0.25em] text-gold">${esc(p.segment)}</p>
        <h3 class="mt-2 font-serif text-2xl text-sand">${esc(p.name)}</h3>
        <p class="mt-1 text-xs text-smoke">${esc(p.city)}</p>
        <p class="mt-4 text-sm leading-relaxed text-beige/80">${esc(p.story)}</p>
        <ul class="mt-5 space-y-2.5">
          ${p.perks.map((k) => `
            <li class="flex items-start gap-3 rounded-xl border border-sand/10 bg-obsidian/40 p-3">
              ${tierBadge(k.tier)}
              <div class="min-w-0">
                <p class="text-[10px] uppercase tracking-[0.2em] text-smoke">${esc(k.type)}</p>
                <p class="text-sm text-beige">${esc(k.text)}</p>
              </div>
            </li>`).join('')}
        </ul>
        <a href="${wa(D.whatsapp.partnerMsg + p.name)}" target="_blank" rel="noopener" class="tap mt-5 flex items-center justify-center gap-2 w-full rounded-full border border-sand/25 py-3 text-xs uppercase tracking-[0.2em] text-sand hover:bg-sand hover:text-obsidian">
          Quero esse benefício
        </a>
      </div>`;
  }

  const track = () => $('#benefitsTrack');
  function benefitCard(b) {
    return `
      <article class="benefit-card snap-start shrink-0 w-[78%] max-w-[300px] rounded-2xl border border-sand/10 bg-charcoal p-5">
        <div class="flex items-center justify-between gap-2">
          <span class="rounded-full border border-sand/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-sand">${esc(b.type)}</span>
          ${tierBadge(b.tier)}
        </div>
        <p class="mt-5 text-[11px] uppercase tracking-[0.25em] text-smoke">${esc(b.category)}</p>
        <p class="mt-1 text-beige font-medium">${esc(b.partner)}</p>
        <p class="mt-4 font-serif text-[26px] leading-tight text-sand">${esc(b.perk)}</p>
        <p class="text-sm text-smoke">${esc(b.detail)}</p>
        <button class="use-benefit tap mt-5 w-full rounded-full border border-sand/20 py-2.5 text-xs uppercase tracking-[0.2em] text-sand hover:bg-sand hover:text-obsidian" data-partner="${esc(b.partner)}">Usar benefício</button>
      </article>`;
  }

  function renderCommunity(key) {
    const c = D.communities[key];
    const t = track();
    t.classList.remove('fade-swap'); void t.offsetWidth; t.classList.add('fade-swap');
    t.innerHTML = c.benefits.map(benefitCard).join('') + '<div class="shrink-0 w-2"></div>';
    t.scrollLeft = 0;
    t.dispatchEvent(new Event('scroll'));
    $('#communityTags').textContent = c.tags;
    $('#whatsCommunity').href = c.groupLink;
    $$('.seg-btn').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.community === key)));
    $('#segIndicator').classList.toggle('right', key === 'feminina');
    try { localStorage.setItem('vellar-community', key); } catch {}
  }

  /* ================= 5. PROMOÇÕES ================= */
  function renderPromos() {
    const P = D.promotions;
    $('#promoTrack').innerHTML = P.items.map((p) => `
      <article class="product-card snap-start shrink-0 w-[66%] max-w-[250px] rounded-2xl border border-sand/10 bg-charcoal overflow-hidden">
        <div data-media class="relative aspect-[4/5] overflow-hidden">
          <div class="photo absolute inset-0" style="background-image:url('${esc(p.image)}')"></div>
          <span class="absolute top-3 left-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-obsidian">${esc(p.badge)}</span>
          <span class="absolute bottom-3 left-3 rounded-full bg-obsidian/70 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-sand">Exclusivo QR Code</span>
        </div>
        <div class="p-4">
          <p class="text-beige text-sm font-medium">${esc(p.name)}</p>
          <p class="text-[11px] text-smoke">${esc(p.material)}</p>
          <div class="mt-2 flex items-baseline gap-2">
            ${p.from && p.from !== p.price ? `<span class="text-xs text-smoke line-through">${esc(p.from)}</span>` : ''}
            <span class="font-serif text-lg text-sand">${esc(p.price)}</span>
          </div>
          ${p.note ? `<p class="text-[11px] text-gold mt-0.5">${esc(p.note)}</p>` : ''}
          <button class="copy-coupon tap mt-3 w-full flex items-center justify-between rounded-lg border border-dashed border-gold/50 px-3 py-2 text-left" data-coupon="${esc(p.coupon)}">
            <span class="text-[10px] uppercase tracking-[0.15em] text-smoke">Cupom</span>
            <span class="font-mono text-xs tracking-wider text-gold">${esc(p.coupon)}</span>
          </button>
          <a href="${wa(D.whatsapp.promoMsg + p.name + ' (cupom ' + p.coupon + ')')}" target="_blank" rel="noopener"
             class="tap mt-2.5 flex items-center justify-center gap-2 rounded-full bg-sand py-2.5 text-[11px] font-semibold uppercase tracking-wider text-obsidian hover:bg-gold">
            ${icon('wa', 'w-3.5 h-3.5')} Garantir
          </a>
        </div>
      </article>`).join('') + '<div class="shrink-0 w-2"></div>';

    $('#promoTrack').addEventListener('click', async (e) => {
      const b = e.target.closest('.copy-coupon');
      if (!b) return;
      try { await navigator.clipboard.writeText(b.dataset.coupon); toast(`Cupom ${b.dataset.coupon} copiado`); }
      catch { toast(`Seu cupom: ${b.dataset.coupon}`); }
    });

    // Contagem regressiva
    const end = new Date(P.endsAt);
    const tick = () => {
      const ms = end - new Date();
      if (ms <= 0) { $('#promoCountdown').textContent = 'encerrada'; return; }
      const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60;
      $('#promoCountdown').textContent = `${d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}min`;
    };
    tick(); setInterval(tick, 30000);
  }

  /* ================= 6. LINKS ================= */
  function renderLinks() {
    $('#linksList').innerHTML = D.links.filter((l) => l.url).map((l) => {
      const href = l.url === 'whatsapp' ? wa(D.whatsapp.conciergeMsg) : l.url;
      const main = l.icon === 'wa';
      return `
        <a href="${esc(href)}" target="_blank" rel="noopener" class="link-row tap flex items-center gap-4 rounded-2xl border ${main ? 'border-gold/50 bg-gold/10' : 'border-sand/10 bg-charcoal'} px-4 py-3.5">
          <span class="grid place-items-center w-10 h-10 rounded-full ${main ? 'bg-gold text-obsidian' : 'border border-gold/30 text-gold'}">${icon(l.icon, 'w-5 h-5')}</span>
          <span class="flex-1 min-w-0">
            <span class="block text-sm text-beige font-medium">${esc(l.label)}</span>
            ${l.detail ? `<span class="block text-[11px] text-smoke">${esc(l.detail)}</span>` : ''}
          </span>
          <svg class="w-4 h-4 text-smoke" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="M9 6l6 6-6 6"/></svg>
        </a>`;
    }).join('');
    $('#concierge').href = wa(D.whatsapp.conciergeMsg);
    $('#year').textContent = today.getFullYear();
  }

  /* ================= Flechas sobrepostas (todos os carrosséis) ================= */
  function setupCarousels() {
    $$('.carousel-wrap').forEach((wrap) => {
      const t = $('.carousel', wrap);
      const mk = (dir) => {
        const b = document.createElement('button');
        b.className = `carousel-nav tap ${dir < 0 ? 'left-3' : 'right-3'}`;
        b.setAttribute('aria-label', dir < 0 ? 'Anterior' : 'Próximo');
        b.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="${dir < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}"/></svg>`;
        b.addEventListener('click', () => {
          const card = t.firstElementChild;
          t.scrollBy({ left: (card.offsetWidth + 16) * dir, behavior: 'smooth' });
        });
        wrap.appendChild(b);
        return b;
      };
      const prev = mk(-1), next = mk(1);

      const update = () => {
        const max = t.scrollWidth - t.clientWidth - 4;
        prev.classList.toggle('is-hidden', t.scrollLeft <= 4);
        next.classList.toggle('is-hidden', t.scrollLeft >= max);
      };
      // Centraliza as flechas na mídia do card (ou no card inteiro)
      const place = () => {
        const card = t.firstElementChild;
        if (!card) return;
        const media = $('[data-media]', card) || card;
        const top = media.getBoundingClientRect().top - wrap.getBoundingClientRect().top + media.offsetHeight / 2;
        prev.style.top = next.style.top = `${top}px`;
        update();
      };
      t.addEventListener('scroll', update, { passive: true });
      if ('ResizeObserver' in window) new ResizeObserver(place).observe(t);
      window.addEventListener('resize', place);
      place();
    });
  }

  /* ================= Reveal on scroll ================= */
  function setupReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$('.reveal').forEach((el) => io.observe(el));
  }

  /* ================= Init ================= */
  renderAbout();
  renderContents();
  renderBastidores();
  renderFeaturedPartner();
  renderPromos();
  renderLinks();

  track().addEventListener('click', (e) => {
    const b = e.target.closest('.use-benefit');
    if (!b) return;
    b.textContent = '✓ Apresente no parceiro';
    b.classList.add('bg-sand', 'text-obsidian');
    toast(`Benefício ${b.dataset.partner} ativado`);
  });
  $$('.seg-btn').forEach((b) => b.addEventListener('click', () => renderCommunity(b.dataset.community)));
  let saved = 'masculina';
  try { saved = localStorage.getItem('vellar-community') || saved; } catch {}
  renderCommunity(D.communities[saved] ? saved : 'masculina');

  setupCarousels();
  setupReveal();
})();

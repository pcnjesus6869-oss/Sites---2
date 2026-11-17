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
    const blocks = a.blocks || (a.text ? [{ text: a.text }] : []);
    $('#aboutText').innerHTML = blocks.map((b) => `
      <article class="rounded-2xl border border-sand/10 bg-charcoal/60 p-5">
        ${b.label ? `<p class="text-[11px] uppercase tracking-[0.25em] text-gold">${esc(b.label)}</p>` : ''}
        ${b.title ? `<h3 class="mt-2 font-serif text-lg text-sand">${esc(b.title)}</h3>` : ''}
        <p class="mt-2 text-[15px] leading-relaxed text-beige/80">${esc(b.text)}</p>
        ${b.tags ? `<div class="mt-4 flex flex-wrap gap-1.5">${b.tags.map((t) => `<span class="rounded-full border border-gold/30 px-2.5 py-1 text-[11px] text-sand">${esc(t)}</span>`).join('')}</div>` : ''}
      </article>`).join('');
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
    // Formato do vídeo (ex.: '9/16' vertical). Vertical: ocupa a largura no celular,
    // mas nunca passa de ~78% da altura da tela (cabe inteiro no aparelho e no computador).
    const [rw, rh] = String(a.ratio || '16/9').split('/').map(Number);
    const vertical = rh > rw;
    const size = vertical
      ? `aspect-ratio:${rw}/${rh};width:min(100%, calc(78svh * ${rw} / ${rh}))`
      : `aspect-ratio:${rw}/${rh};width:100%`;
    box.innerHTML = `
      <div class="video-frame relative mx-auto rounded-2xl overflow-hidden border border-sand/10 bg-obsidian shadow-2xl" style="${size}">
        <video class="absolute inset-0 w-full h-full object-cover" playsinline preload="metadata" poster="${esc(a.poster)}" src="${esc(a.src)}"></video>
        <div data-cover class="absolute inset-0 photo flex flex-col justify-end p-5 cursor-pointer" style="background-image:url('${esc(a.poster)}')">
          <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/10"></div>
          <button data-play class="tap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-16 h-16 rounded-full border border-sand/50 bg-obsidian/50 backdrop-blur text-sand" aria-label="Assistir vídeo">
            ${icon('play', 'w-6 h-6 ml-1')}
          </button>
          <div class="relative flex items-end justify-between gap-3">
            <p class="font-serif text-lg leading-tight text-sand">${esc(a.label)}</p>
            <span data-dur class="shrink-0 rounded-full bg-obsidian/60 backdrop-blur px-2.5 py-1 text-[11px] tabular-nums text-sand/90"></span>
          </div>
        </div>
      </div>`;
    const video = $('video', box);
    const cover = $('[data-cover]', box);
    video.addEventListener('loadedmetadata', () => {
      const s = Math.round(video.duration || 0);
      if (s) $('[data-dur]', box).textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    });
    const start = async () => {
      try {
        video.controls = true;
        await video.play();
        cover.classList.add('hidden');
      } catch {
        video.controls = false;
        toast('Não foi possível tocar o vídeo');
      }
    };
    cover.addEventListener('click', start);
    // Ao terminar, volta a capa
    video.addEventListener('ended', () => { video.controls = false; video.currentTime = 0; cover.classList.remove('hidden'); });
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

    renderArticles(c.articles || []);
  }

  // Artigos: menu suspenso que abre o texto formatado como página
  function renderArticles(list) {
    const box = $('#contentArticles');
    if (!list.length) { box.remove(); return; }
    box.innerHTML = list.map((a) => `
      <details class="article reveal rounded-2xl border border-sand/10 bg-charcoal overflow-hidden">
        <summary class="tap flex items-center gap-4 p-5 cursor-pointer select-none">
          <span class="shrink-0 grid place-items-center w-11 h-11 rounded-full border border-gold/40 text-gold">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/></svg>
          </span>
          <span class="min-w-0 flex-1">
            <span class="block text-[10px] uppercase tracking-[0.25em] text-gold">${esc(a.label || 'Artigo')}</span>
            <span class="block mt-1 font-serif text-lg leading-tight text-sand">${esc(a.title)}</span>
            <span class="block mt-1 text-xs text-smoke">${esc(a.author)}${a.readTime ? ' · ' + esc(a.readTime) : ''}</span>
          </span>
          <svg class="article-chevron shrink-0 w-5 h-5 text-sand/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="m6 9 6 6 6-6"/></svg>
        </summary>
        <div class="article-body px-6 pb-8 pt-2 border-t border-sand/10">
          <header class="pt-6 text-center">
            <p class="text-[10px] uppercase tracking-[0.35em] text-gold">Comunidade Vellar</p>
            <h3 class="mt-3 font-serif text-[22px] sm:text-3xl tracking-[0.08em] sm:tracking-[0.15em] text-sand break-words">${esc(a.title).toUpperCase()}</h3>
            <p class="mt-3 text-xs italic text-smoke">Por ${esc(a.author)}</p>
            <span class="block mx-auto mt-5 w-10 h-px bg-gold/60"></span>
          </header>
          <div class="mt-6">
            ${a.blocks.map((b) => b.h
              ? `<h4 class="mt-6 first:mt-0 font-serif text-lg text-sand">${esc(b.h)}</h4>`
              : `<p class="article-p mt-4 text-[15px] leading-[1.75] text-beige/85">${esc(b.p)}</p>`).join('')}
          </div>
          ${a.quote ? `<blockquote class="mt-8 border-l-2 border-gold pl-4 font-serif text-lg italic leading-snug text-sand">${esc(a.quote)}</blockquote>` : ''}
          <p class="mt-6 text-right text-xs italic text-smoke">— ${esc(a.author)}</p>
          <button type="button" class="article-close tap mt-8 w-full rounded-full border border-sand/20 py-2.5 text-xs uppercase tracking-[0.2em] text-sand hover:bg-sand hover:text-obsidian">Fechar artigo</button>
        </div>
      </details>`).join('');

    box.addEventListener('click', (e) => {
      const b = e.target.closest('.article-close');
      if (!b) return;
      const d = b.closest('details');
      d.open = false;
      d.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

  // Link de WhatsApp para um número específico (ex.: o do parceiro)
  const waTo = (num, msg) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

  /* ================= SORTEIO ================= */
  function renderRaffle() {
    const r = D.raffle;
    if (!r) { $('#sorteio').remove(); return; }
    const when = r.drawDate
      ? new Date(`${r.drawDate}T12:00:00-03:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })
      : (r.drawNote || 'em breve');
    const imgs = r.images || (r.image ? [{ src: r.image }] : []);
    $('#raffle').innerHTML = `
      <div class="relative aspect-[4/3] overflow-hidden" aria-label="Fotos do prêmio">
        ${imgs.map((im, i) => `<div class="raffle-slide photo absolute inset-0 ${i === 0 ? 'is-on' : ''}" style="background-image:url('${esc(im.src)}');background-position:${esc(im.position || 'center')}"></div>`).join('')}
        <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent"></div>
        ${imgs.length > 1 ? `<div class="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">${imgs.map((_, i) => `<span class="raffle-dot dot ${i === 0 ? 'active' : ''}"></span>`).join('')}</div>` : ''}
        <span class="absolute top-3 left-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-obsidian">Sorteio</span>
        <span class="absolute top-3 right-3 rounded-full bg-obsidian/70 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-sand">+ Travesseiro de brinde</span>
      </div>
      <div class="p-5 pt-2">
        <h2 class="font-serif text-2xl text-sand">${esc(r.title)}</h2>
        <p class="mt-2 text-beige font-medium">${esc(r.prize)}</p>
        <p class="mt-3 text-sm leading-relaxed text-smoke">${esc(r.text)}</p>
        <p class="mt-5 text-[11px] uppercase tracking-[0.25em] text-gold">Como participar</p>
        <ol class="mt-3 space-y-2.5">
          ${r.steps.map((s, i) => `
            <li class="flex items-start gap-3">
              <span class="shrink-0 grid place-items-center w-6 h-6 rounded-full border border-gold/50 text-[11px] text-gold">${i + 1}</span>
              <span class="text-sm text-beige/90 leading-snug pt-0.5">${esc(s)}</span>
            </li>`).join('')}
        </ol>
        <p class="mt-5 text-xs text-smoke">Data do sorteio: <span class="text-sand">${esc(when)}</span></p>
      </div>`;

    // Alterna as fotos (peça Vellar ↔ travesseiros) a cada 4 s, com fade
    const slides = $$('.raffle-slide', $('#raffle'));
    const dots = $$('.raffle-dot', $('#raffle'));
    if (slides.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let cur = 0;
      setInterval(() => {
        if (document.hidden) return;
        slides[cur].classList.remove('is-on'); dots[cur].classList.remove('active');
        cur = (cur + 1) % slides.length;
        slides[cur].classList.add('is-on'); dots[cur].classList.add('active');
      }, 4000);
    }
  }

  function renderFeaturedPartner() {
    const p = D.featuredPartner;
    const story = Array.isArray(p.story) ? p.story : [p.story];
    const partnerWa = (msg) => (p.whatsapp ? waTo(p.whatsapp, msg) : wa(D.whatsapp.partnerMsg + p.name));
    const highlight = p.promo && p.promo.highlight;

    // Promoção em destaque: abre o card com a arte grande
    const promoHero = highlight ? `
      <div class="relative aspect-[4/3] photo" style="background-image:url('${esc(p.promo.image)}')" role="img" aria-label="${esc(p.promo.title)}">
        <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal to-transparent"></div>
        <span class="absolute bottom-4 left-4 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-obsidian">Parceiro em destaque · ${esc(p.name)}</span>
      </div>
      <div class="p-5 pb-6 border-b border-sand/10">
        <p class="text-[11px] uppercase tracking-[0.25em] text-gold">${esc(p.promo.label)}</p>
        <h3 class="mt-2 font-serif text-xl leading-snug text-sand">${esc(p.promo.title)}</h3>
        <p class="mt-2 text-[15px] leading-relaxed text-beige/85">${esc(p.promo.text)}</p>
        <a href="${partnerWa(p.promo.msg)}" target="_blank" rel="noopener" class="tap cta-shine relative overflow-hidden mt-5 flex items-center justify-center gap-2 w-full rounded-full bg-sand py-3.5 text-sm font-semibold text-obsidian hover:bg-gold">
          ${icon('wa', 'w-4 h-4')} ${esc(p.promo.cta)}
        </a>
      </div>` : '';

    const promo = p.promo && !highlight ? `
        <div class="mt-6 rounded-2xl overflow-hidden border border-gold/40 bg-gradient-to-br from-gold/15 to-transparent">
          ${p.promo.image ? `<div class="aspect-[16/10] photo" style="background-image:url('${esc(p.promo.image)}')"></div>` : ''}
          <div class="p-4">
            <div class="flex items-center gap-3">
              ${p.promo.image ? '' : `<span class="shrink-0 grid place-items-center w-11 h-11 rounded-full border border-gold/50 text-gold">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path d="M4 9c0-2 1.5-3 3-3h10c1.5 0 3 1 3 3v6c0 2-1.5 3-3 3H7c-1.5 0-3-1-3-3z"/><path d="M4 12c2.5-1 5-1 8 0s5.5 1 8 0"/></svg>
              </span>`}
              <div class="min-w-0">
                <p class="text-[10px] uppercase tracking-[0.25em] text-gold">${esc(p.promo.label)}</p>
                <p class="font-serif text-lg leading-tight text-sand">${esc(p.promo.title)}</p>
              </div>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-beige/80">${esc(p.promo.text)}</p>
            <a href="${partnerWa(p.promo.msg)}" target="_blank" rel="noopener" class="tap mt-4 flex items-center justify-center gap-2 w-full rounded-full bg-sand py-3 text-xs font-semibold uppercase tracking-[0.15em] text-obsidian hover:bg-gold">
              ${icon('wa', 'w-3.5 h-3.5')} ${esc(p.promo.cta)}
            </a>
          </div>
        </div>` : '';

    $('#featuredPartner').innerHTML = `
      ${promoHero}
      ${p.cover ? `<div class="relative aspect-[16/10] photo" style="background-image:url('${esc(p.cover)}')">
        <div class="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
        ${highlight ? '' : '<span class="absolute top-3 left-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-obsidian">Parceiro em destaque</span>'}
      </div>` : ''}
      <div class="p-5">
        <p class="text-[11px] uppercase tracking-[0.25em] text-gold">${esc(p.segment)}</p>
        <h3 class="mt-2 font-serif text-2xl text-sand">${esc(p.name)}</h3>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ', ' + p.city)}" target="_blank" rel="noopener" class="mt-1 inline-block text-xs text-smoke underline underline-offset-4 decoration-smoke/40">${esc(p.city)}</a>
        ${p.aboutTitle ? `<p class="mt-5 text-[11px] uppercase tracking-[0.25em] text-gold">${esc(p.aboutTitle)}</p>` : ''}
        ${story.map((s, i) => `<p class="mt-2 ${i ? 'text-sm text-beige/70' : 'text-[15px] text-beige/90'} leading-relaxed">${esc(s)}</p>`).join('')}
        ${promo}
        <p class="mt-6 text-[11px] uppercase tracking-[0.25em] text-gold">Benefícios para membros</p>
        <ul class="mt-3 space-y-2.5">
          ${p.perks.map((k) => `
            <li class="flex items-start gap-3 rounded-xl border border-sand/10 bg-obsidian/40 p-3">
              ${tierBadge(k.tier)}
              <div class="min-w-0">
                <p class="text-[10px] uppercase tracking-[0.2em] text-smoke">${esc(k.type)}</p>
                <p class="text-sm text-beige">${esc(k.text)}</p>
              </div>
            </li>`).join('')}
        </ul>
        <div class="mt-5 grid ${p.instagram ? 'grid-cols-2' : 'grid-cols-1'} gap-2">
          <a href="${partnerWa(p.msg || D.whatsapp.partnerMsg + p.name)}" target="_blank" rel="noopener" class="tap flex items-center justify-center gap-2 rounded-full border border-sand/25 py-3 text-[11px] uppercase tracking-[0.15em] text-sand hover:bg-sand hover:text-obsidian">
            ${icon('wa', 'w-3.5 h-3.5')} WhatsApp
          </a>
          ${p.instagram ? `<a href="${esc(p.instagram)}" target="_blank" rel="noopener" class="tap flex items-center justify-center gap-2 rounded-full border border-sand/25 py-3 text-[11px] uppercase tracking-[0.15em] text-sand hover:bg-sand hover:text-obsidian">
            ${icon('ig', 'w-3.5 h-3.5')} Instagram
          </a>` : ''}
        </div>
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
          <div class="photo absolute inset-0" style="background-image:url('${esc(p.image)}')${p.zoom ? `;background-size:${esc(p.zoom)}` : ''}"></div>
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
  renderRaffle();
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
  // "Mais parceiros na sua comunidade" fica guardado até VELLAR.showCommunities = true
  $('#communitiesBlock').hidden = !D.showCommunities;
  let saved = 'masculina';
  try { saved = localStorage.getItem('vellar-community') || saved; } catch {}
  renderCommunity(D.communities[saved] ? saved : 'masculina');

  setupCarousels();
  setupReveal();
})();

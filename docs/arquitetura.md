# Arquitetura

Site 100% estático (HTML + CSS + JS puro). Sem framework, sem build, sem dependências npm, sem banco de dados.

## Fluxo
1. `index.html` carrega Google Fonts (Cinzel, Inter), Tailwind via CDN (`cdn.tailwindcss.com/3.4.16`) com `tailwind.config` inline (cores e fontes da marca), `css/styles.css`, depois `js/data.js` e `js/app.js`.
2. `js/data.js` define um único objeto global `window.VELLAR` com todo o conteúdo.
3. `js/app.js` (IIFE) lê `window.VELLAR` e injeta HTML nos contêineres vazios de `index.html` (ids como `#aboutPlayer`, `#contentTrack`, `#bastidoresTrack`, `#featuredPartner`, `#benefitsTrack`, `#promoTrack`, `#linksList`, `#concierge`).
4. Todo texto vindo do `data.js` passa por `esc()` (escape de HTML) antes de entrar no `innerHTML`.

## Seções e funções em `js/app.js`
| Seção | Função | Comportamento |
|---|---|---|
| Sobre nós | `renderAbout`, `renderAudioPlayer`, `renderVideoPlayer` | `about.type` escolhe MP3 (player próprio com barra, tempo e "onda" animada) ou MP4 (com `poster`). Se o arquivo não existir (evento `error`), o player de áudio entra em **modo prévia** (simula reprodução). |
| Conteúdos exclusivos | `renderContents` | Card fica bloqueado (cadeado + data) até `release` (meia-noite, fuso -03:00). `url` vazia → aviso "link ainda não configurado". |
| Bastidores | `renderBastidores` | Cards com capa local (`thumb`), headline e data; último card leva ao perfil do Instagram. |
| Parceiros | `renderFeaturedPartner`, `benefitCard`, `renderCommunity` | Destaque com `perks` por nível; seletor Masculina/Feminina (indicador deslizante `.seg-indicator`) troca benefícios, tags e `groupLink`. |
| Promoções | `renderPromos` | Preço de/por, selo, cupom copiável (`navigator.clipboard` + toast), botão "Garantir" abre WhatsApp com peça + cupom; contagem regressiva até `promotions.endsAt`. |
| Links | `renderLinks` | Lista de `links`; `url: ''` oculta, `url: 'whatsapp'` usa o Concierge. |
| Geral | `setupCarousels`, `setupReveal`, `toast` | Carrosséis com scroll-snap e flechas sobrepostas, ocultas nas pontas; `IntersectionObserver` aplica `.reveal.is-visible`. |

WhatsApp: helper `wa(msg)` monta `https://wa.me/<number>?text=<msg>`.

## CSS (`css/styles.css`)
Complementa o Tailwind com: animações (`fadeUp`, `bob`, `wave`, `swap`, `shine`), `.reveal`, `.tap`, `.carousel` (sem scrollbar), `.chip`, `.eyebrow`, selos `.tier-MEMBRO/VIP/BLACK/PRIME`, `.carousel-nav`, `.toast`, `.concierge`, e classes `.photo-1..4` (degradês de fallback da época sem fotos).

## Ícones
Sprite SVG inline no fim do `index.html` (`<symbol id="i-wa|i-ig|i-tt|i-web|i-play|i-pause|i-lock">`), usado via `<use href="#i-...">`.

## Assets
- `assets/img/produtos/*.jpg` — fotos reais (Instagram @vellar.semijoias).
- `assets/img/bastidores/DeKn9qkPcvo.jpg` — capa do único reel público acessível sem login.
- `assets/img/campanha-poster.svg` — capa para o modo vídeo do Sobre nós (ilustração própria).
- `assets/img/parceiro-casa-oficio.svg` — capa do parceiro fictício.
- `assets/media/` — vazio (`.gitkeep`), destino do MP3/MP4.

## Servidor local (`dev-server.js`)
`http` nativo do Node, serve a raiz do projeto na porta 5173 (ou `PORT`), mapeia MIME de html/css/js/svg/png/jpg/webp/mp3/mp4, bloqueia caminhos fora da raiz (403), 404 para inexistentes. `.claude/launch.json` registra a config `vellar`.

## Hospedagem
- Repositório de trabalho: `origin` → github.com/pcnjesus6869-oss/Sites---2 (branch `main`).
- Base congelada: `storage` → github.com/pcnjesus6869-oss/Storage-Site---1.
- Produção: Netlify faz deploy automático do repo `pcnjesus6869-oss/Sites-1` (raiz = site Criare Colchões). O Vellar está copiado em `Sites-1/vellarsemijoias/` → https://paulonapojesus.netlify.app/vellarsemijoias/. Como os caminhos no site são relativos, funciona na subpasta. Se existe `_redirects`/config específica no Sites-1 que afete a subpasta: a confirmar.

## Limites conhecidos
- Erro de sintaxe em `data.js` deixa a página em branco (sem validação).
- Atualização exige editar arquivo + git; não há painel/CMS.
- Bastidores não sincronizam com o Instagram (exigiria API oficial + token).
- Tailwind CDN não é recomendado para produção (funciona, mas é mais pesado).

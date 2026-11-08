# Vellar — Mini Site Pós-Caixa (QR Code)

Site estático, mobile-first, feito a partir da `especificação técnica e visual v1.0`.

## Rodar localmente
```bash
node dev-server.js
```
Abra http://localhost:5173

## Estrutura
- `index.html` — layout (Hero, Manifesto, Comunidade, Coleção, Footer, Concierge)
- `css/styles.css` — animações, micro-interações e placeholders de foto
- `js/data.js` — **conteúdo editável**: WhatsApp, links dos grupos, parceiros e peças
- `js/app.js` — player de áudio, seletor de comunidade, carrosséis, vídeo, toasts

## Pendências de conteúdo
- `assets/audio/boas-vindas.mp3` — áudio do fundador (sem ele, o player roda em modo prévia)
- `assets/video/campanha.mp4` — vídeo da campanha
- `assets/img/*` — fotos das peças (preencher `image` em `js/data.js`)
- Número real do WhatsApp e links dos grupos em `js/data.js`

## Produção
O Tailwind está via CDN para desenvolvimento. Para publicar, compile com o Tailwind CLI
(copiando o `tailwind.config` do `<head>`) e remova o `<script src="https://cdn.tailwindcss.com…">`.

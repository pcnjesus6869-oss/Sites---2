# Vellar — Mini Site Pós-Caixa (QR Code)

Site estático, mobile-first. Todo o conteúdo fica em **`js/data.js`**.

## Rodar localmente
```bash
node dev-server.js
```
Abra http://localhost:5173

## Estrutura da página
1. **Sobre nós**: player de áudio (MP3) **ou** vídeo (MP4).
2. **Conteúdos exclusivos**: cards semanais que liberam por data.
3. **Bastidores**: reels do Instagram @comunidadevellar em cards com headline.
4. **Empresas parceiras**: parceiro em destaque + benefícios por comunidade e nível.
5. **Promoções exclusivas QR Code**: cupom copiável, contagem regressiva e WhatsApp.
6. **Links**: WhatsApp e redes sociais.

## Como trocar o conteúdo (`js/data.js`)
| O quê | Onde |
| --- | --- |
| Áudio/vídeo do "Sobre nós" | `about.type` (`'audio'` ou `'video'`) e `about.src` (arquivo em `assets/media/`) |
| Conteúdos da semana | `contents.items` (`release` = data de liberação, `url` = link) |
| Bastidores | `bastidores.items` (`url`, `headline`, `thumb` salvo em `assets/img/bastidores/`) |
| Parceiros | `featuredPartner` e `communities` |
| Promoções | `promotions.items` e `promotions.endsAt` |
| WhatsApp e redes | `whatsapp.number` e `links` (url vazia esconde o item) |

> As capas do Instagram expiram se usadas direto do link do Instagram: salve a imagem no projeto.

## Pendências
- `assets/media/sobre-nos.mp3` (ou `.mp4`): sem o arquivo, o player roda em modo prévia.
- Links de convite dos grupos de WhatsApp (hoje abrem conversa com o número da Vellar).
- Parceiros, preços e cupons são exemplos.

## Produção
O Tailwind está via CDN para desenvolvimento. Para publicar, compile com o Tailwind CLI
(copiando o `tailwind.config` do `<head>`) e remova o `<script src="https://cdn.tailwindcss.com…">`.

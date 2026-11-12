# Vellar — Mini Site Pós-Caixa (QR Code) · Projeto PJ

Instruções permanentes para qualquer sessão de IA neste projeto. Responder ao usuário em **português do Brasil**, linguagem simples (o usuário não é desenvolvedor).

## O que é
Mini site estático, mobile-first, aberto pelo **QR Code que vem na caixa** da joia Vellar Semijoias. Dá "acesso exclusivo de membro" à **Comunidade Vellar**: mensagem do fundador, conteúdos semanais, bastidores, parceiros com benefícios, promoções exclusivas do QR Code e contatos.

- **Marca:** Vellar Semijoias. Slogan no hero: "Superação como estilo de vida". Fechamento: "Para quem escolheu não ficar parado." Rodapé: "Produtos que carregam histórias".
- **Conceito central (docs do usuário):** o produto real é o **ACESSO**, não desconto nem grupo de WhatsApp. Comunidade = ecossistema que liga membros a parceiros.
- **Níveis de membro:** MEMBRO, VIP, BLACK, PRIME (sobe-se de nível).
- **Tipos de benefício:** Desconto, Brinde, Sorteio, Experiência, Evento, Acesso antecipado.
- **Duas vozes / duas comunidades:** Masculina — **Thiago Alves** (fundador; psicologia, espiritualidade, empreendedorismo). Feminina — uma criadora cujo **nome ainda não foi definido** (a confirmar).
- **Persona:** pessoa em evolução, busca progresso e não perfeição; inimigo = **estagnação**.
- **Calendário:** 1 coleção por mês, precedida de 4 semanas de conteúdo (identificação antes da venda). Outubro: Psicologia → Coleção Foco. Novembro: Espiritualidade → Coleção Conceito Espiritualidade.
- Ideias dos docs ainda **não** aplicadas: bloco "valor real" ("R$20 + R$30 + R$20 = R$70 em vantagens no mês" / "Se você já vai gastar, por que não gastar tendo benefícios?"), frase "Eu faço parte da Comunidade Vellar", manifesto oficial da Persona, explicação de como subir de nível.

Fontes de estratégia (fora do repo, em `C:\Users\pcnje\Downloads`, se ainda existirem): `Projeto_Vellar_28_Paginas.pdf`, `Persona_Vellar_Resumo_Estrategico.pdf`, `Vellar Semijoias_Mini Site.pdf` (provável especificação visual original — a confirmar).

## Estado atual (2026-11-08)
- Site completo e **publicado**: https://paulonapojesus.netlify.app/vellarsemijoias/
- Código nesta pasta (`D:\Projetos-Claude\Vellar-Site`), git limpo e igual a `origin/main`.
- Remotes: `origin` = https://github.com/pcnjesus6869-oss/Sites---2 (repo de trabalho). `storage` = https://github.com/pcnjesus6869-oss/Storage-Site---1 (versão-base congelada — **NUNCA enviar nada para ele**).
- WhatsApp real configurado: `5547999728395` (+55 47 9 9972-8395).
- Fotos reais das peças (tiradas do Instagram @vellar.semijoias) em `assets/img/produtos/`.

## Estrutura
```
index.html        esqueleto da página + config do Tailwind (CDN) + ícones SVG (<symbol>)
css/styles.css    animações e efeitos (reveal, carrossel, selos de nível, toast...)
js/data.js        TODO o conteúdo editável (window.VELLAR) — o único arquivo a mexer para conteúdo
js/app.js         lê window.VELLAR e monta as seções (player, carrosséis, cadeados, cupons, contagem)
dev-server.js     servidor estático Node sem dependências (porta 5173)
assets/img/       produtos/ (jpg reais), bastidores/ (capas dos reels), campanha-poster.svg, parceiro-casa-oficio.svg
assets/media/     áudio/vídeo do "Sobre nós" (vazio; só .gitkeep)
.claude/launch.json  config "vellar" para o preview do app (node dev-server.js, porta 5173)
```
Seções, na ordem: Hero (logo VR, selo "QR Code Validado", chips de atalho) → 1 Sobre nós (`#sobre`) → 2 Conteúdos exclusivos (`#conteudos`) → 3 Bastidores (`#bastidores`) → 4 Empresas parceiras (`#parceiros`, destaque + seletor Masculina/Feminina) → 5 Promoções QR Code (`#promocoes`) → Links/rodapé (`#links`) + botão flutuante Concierge. Detalhes: [docs/arquitetura.md](docs/arquitetura.md).

## Como rodar
```bash
node dev-server.js        # http://localhost:5173  (PORT=xxxx para outra porta)
```
No app Claude, usar `preview_start` com o nome `vellar`. Sem build, sem npm install. Testar sempre em largura de celular (375px).

## Onde trocar conteúdo (`js/data.js`)
| O quê | Chave |
|---|---|
| WhatsApp e mensagens prontas | `whatsapp.number`, `*Msg` |
| Redes/rodapé (url `''` esconde o item; `'whatsapp'` = Concierge) | `links` |
| Sobre nós (áudio MP3 ou vídeo MP4) | `about.type` (`'audio'`/`'video'`), `about.src` |
| Conteúdos da semana (abrem por data; vazio = "link em breve") | `contents.items[].release` (AAAA-MM-DD), `.url` |
| Bastidores (capa salva localmente, nunca link do CDN do Instagram) | `bastidores.items[]` `{url, headline, date, thumb}` |
| Parceiro em destaque | `featuredPartner` (`perks[]` com `tier`/`type`/`text`) |
| Benefícios por comunidade | `communities.masculina/feminina.benefits[]`, `groupLink` |
| Promoções | `promotions.items[]`, `promotions.endsAt` |

`tier` sempre em MAIÚSCULAS (define a classe CSS `.tier-MEMBRO` etc.). Uma vírgula/aspa errada em `data.js` deixa a página em branco — conferir o console (F12).

## Identidade visual
- **Cores** (tokens Tailwind no `<head>`): obsidian `#0D0D0D` (fundo), charcoal `#1A1A1A`, sand `#E5D9C5` (títulos), gold `#C5A880` (destaque/eyebrow), beige `#F4EFEA` (texto), smoke `#8E8E93` (texto secundário). PRIME = gradiente dourado; BLACK = preto com borda clara.
- **Tipografia:** Cinzel (serif, títulos, caixa alta com tracking largo) + Inter (texto). Google Fonts.
- **Tom:** escuro, sóbrio, premium/minimalista; "menos excesso, mais presença"; frases curtas de evolução pessoal; exclusividade de membro. Fotos: linho, luz forte, dourado.
- Microinterações: fade-up ao rolar, `scale(.96)` ao tocar, flechas do carrossel **sobrepostas ao card** (não acima), ocultas no primeiro/último card.

## Publicação (Netlify)
O Netlify publica automaticamente o repo **Sites-1** (https://github.com/pcnjesus6869-oss/Sites-1 — site da **Criare Colchões** na raiz). O Vellar é uma **cópia** em `Sites-1/vellarsemijoias/`. Atualizar o site no ar = copiar `index.html`, `css/`, `js/`, `assets/` para essa pasta e dar push no Sites-1, **sem tocar nos arquivos da Criare**. Mudar só o Sites---2 NÃO atualiza o site publicado. Ver [docs/decisoes.md](docs/decisoes.md).

## Convenções e preferências do usuário
- **Confirmar antes de qualquer commit/push** e dizer para qual repositório. Push só quando ele pedir explicitamente.
- Storage-Site---1 é intocável. Arquivos da Criare em Sites-1 são intocáveis.
- Conteúdo novo vai em `data.js`, não hardcoded no HTML. Itens fictícios marcados com comentário `FICTÍCIO`/`EXEMPLO`.
- Imagens de terceiros/Instagram: salvar no projeto (links do CDN expiram).
- Respostas: explicar o que mudou, onde, o que é fictício e o que falta; verificar no navegador em tela de celular antes de dizer que está pronto.
- Não há editor de código instalado na máquina do usuário (VS Code etc.) — a confirmar se mudou.
- Não colocar credenciais no repo. Autor git configurado localmente neste repo (não global).

## Pendências
- Arquivo do "Sobre nós" (`assets/media/sobre-nos.mp3` ou `.mp4`) — hoje o player roda em modo prévia (404 esperado no console).
- Links de convite dos grupos de WhatsApp (hoje `groupLink` abre conversa com o número).
- Parceiros (Casa Ofício e os da lista), nomes/preços/cupons das peças: **fictícios**.
- `url` dos conteúdos semanais vazias; só 1 reel nos Bastidores (precisa de links/capas dos demais).
- TikTok e Loja online sem link (ocultos).
- Nome da criadora da comunidade feminina; aplicar ideias dos docs listadas acima.
- Tailwind via CDN: compilar com Tailwind CLI para produção (opcional).
- Selo "Powered by Netlify" sobrepõe o Concierge — desligar no painel do Netlify (Badges), ação do usuário.
- Ideia oferecida e não feita: `data.js` → `.json` com validação, ou Google Sheets como fonte de conteúdo.

## Docs
- [docs/decisoes.md](docs/decisoes.md) — decisões e porquês
- [docs/arquitetura.md](docs/arquitetura.md) — como o código funciona
- [docs/historico.md](docs/historico.md) — linha do tempo
- [README.md](README.md) — guia rápido do conteúdo

## Atualização 12/11/2026
- Seções atuais: Hero → Sobre nós (player + blocos "Vellar Semijoias"/"Comunidade Vellar") → Conteúdos (ciclo **Psicologia**) → Bastidores → **Sorteio Vellar × Criare** (`#sorteio`, `VELLAR.raffle`) → Empresas parceiras (**Criare Colchões** em destaque, promoção de travesseiros no topo) → Promoções → Links.
- Novas chaves em `data.js`: `about.blocks[]` (`label`, `title`, `text`, `tags`), `raffle` (`images[]` com `src`/`position`, `drawDate`, `drawNote`, `steps`), `featuredPartner.whatsapp/instagram/msg/aboutTitle`, `story` como lista de parágrafos, `promo.highlight`.
- Imagens novas em `assets/img/parceiros/`: `promo-travesseiros.jpg` (arte enviada pela Criare) e `criare-colchao-cloud.webp` (foto da vitrine da Criare, hoje sem uso).
- **O Sites---2 está à frente do site publicado**: nesta etapa o usuário pediu para NÃO mexer no Sites-1 (Criare). A seção "Publicação (Netlify)" acima continua válida como procedimento, mas só deve ser feita com pedido explícito.
- Pendências novas: confirmar a peça do sorteio (hoje Colar Ponto de Luz, exemplo), data do sorteio, datas reais dos conteúdos de Psicologia. "Mais parceiros na sua comunidade" ainda tem parceiros fictícios. `assets/img/parceiro-casa-oficio.svg` ficou sem uso.

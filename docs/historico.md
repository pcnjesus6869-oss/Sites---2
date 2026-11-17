# Histórico

## 2026-11-07
- **09:30** — 1ª versão do mini site criada a partir da especificação técnica/visual (hero com logo VR e selo "QR Code Validado", áudio do fundador, Manifesto, seletor de comunidade Masculina/Feminina com benefícios VIP/BLACK, vídeo da coleção, vitrine com "Reservar" via WhatsApp, rodapé com Instagram e Concierge). Criados `dev-server.js` e `.claude/launch.json` (porta 5173).
- **09:37** — Ilustrações SVG fictícias das peças e capa da campanha; campos vazios preenchidos (WhatsApp fictício, links de grupo via mensagem pronta); flechas dos carrosséis movidas para **sobre** os cards ("Sua Comunidade" e "Complete sua presença").

## 2026-11-08
- **05:24** — 1º commit (`8204448`) e push para github.com/pcnjesus6869-oss/Storage-Site---1 (versão-base).
- **05:29** — Leitura dos PDFs `Projeto_Vellar_28_Paginas.pdf` e `Persona_Vellar_Resumo_Estrategico.pdf`; levantadas as divergências site × docs.
- **05:33** — Reestruturação conforme roteiro do usuário: Sobre nós (MP3/MP4), Conteúdos exclusivos por semana (Novembro · Espiritualidade), Bastidores (reel do @comunidadevellar), Empresas parceiras (Casa Ofício + 4 níveis e 6 tipos de benefício), Promoções do QR Code (cupons, contagem até 30/11), Links. Manifesto e vídeo da coleção removidos.
- **05:43** — WhatsApp real `+55 47 9 9972-8395` em todos os botões.
- **05:47** — Explicação ao usuário de como atualizar `data.js` e avaliação de eficiência (sugeridas: JSON com validação, Google Sheets, Supabase/CMS — nada implementado).
- **05:51** — Fotos reais do Instagram @vellar.semijoias em `assets/img/produtos/` (SVGs removidos). Commit `9464889` "Nova estrutura do mini site Vellar" enviado para Sites---2 (`origin`); Storage virou remote `storage`, intocado.
- **05:55** — Publicado em https://paulonapojesus.netlify.app/vellarsemijoias/ copiando o site para a pasta `vellarsemijoias/` do repo Sites-1 (Criare Colchões) e dando push; Netlify publicou em < 1 min.
- Depois — projeto movido do workspace temporário para `D:\Projetos-Claude\Vellar-Site` (caminhos `scratch-workspaces` antigos não valem mais). Documentação permanente (CLAUDE.md, docs/) criada.

## 2026-11-12
- Projeto aberto em `D:\Projetos-Claude\Vellar-Site` (preview `vellar`, porta 5173).
- **Conteúdos exclusivos** trocados para o ciclo de **Psicologia** (funil do Projeto Vellar, semanas 1–4 + lançamento da Coleção Foco), liberando de 12/11 a 10/12 (datas de exemplo).
- **Nova seção Sorteio Vellar × Criare** (`#sorteio`, chip "Sorteio"): peça Vellar + travesseiro Criare de brinde; só pelo Instagram (sem botão de WhatsApp); "Data do sorteio: acompanhe o Instagram"; fotos alternando a cada 4 s (peça ↔ travesseiros).
- **Sobre nós**: blocos resumidos "Vellar Semijoias" e "Comunidade Vellar" (com etiquetas de temas) a partir do texto oficial enviado pelo usuário.
- **Empresas parceiras**: Casa Ofício (fictícia) substituída pela **Criare Colchões**; promoção de travesseiros em destaque no topo do card (arte enviada pela loja, sem valores, botão para o WhatsApp da Criare); texto oficial "Sobre a Criare"; botões WhatsApp/Instagram da Criare.
- Enviado **somente para o Sites---2**. Por pedido do usuário, o Sites-1 (Criare / site no Netlify) **não** foi alterado nesta etapa, então o site publicado ainda mostra a versão anterior.
- Depois, a pedido do usuário: cópia atualizada em `Sites-1/vellarsemijoias/` (commit `863e127`, só arquivos dessa pasta) e publicada no Netlify. Site no ar igual ao Sites---2 (`60c2861`). Nada da Criare alterado.

## 2026-11-17
- Branch `ajustes/artigo-travesseiro` (local, sem commit/push).
- **Travesseiros:** foto nova enviada pelo usuário, recortada em 4:3 → `assets/img/parceiros/travesseiro-criare.jpg`. Usada no sorteio e no card da Criare (card passou de 3:4 para 4:3 e agora mostra o título da promoção em texto, já que a foto não tem a arte). `promo-travesseiros.jpg` ficou guardada sem uso.
- **Conteúdos exclusivos:** menu suspenso com o artigo "Originalidade" (Thiago Alves Moreira), formatado como página (título, autor, subtítulo, letra capitular, citação em destaque, botão "Fechar artigo"). Texto em `VELLAR.contents.articles` (`js/data.js`).
- **"Mais parceiros na sua comunidade" escondido**, junto com o seletor Masculina/Feminina e o botão "Entrar na Comunidade no WhatsApp". Dados mantidos; para voltar: `showCommunities: true` em `js/data.js`.
- **Promoções "Só para quem escaneou":** 4 brincos novos (fotos enviadas pelo usuário em `assets/img/produtos/brinco-*.webp`): Mosaico, Orvalho, Folha e Cristal, todos de R$ 80,00 por R$ 60,00 (-25%), cupons QRMOSAICO, QRORVALHO, QRFOLHA, QRCRISTAL. Nomes Folha e Cristal e os materiais são EXEMPLO (a confirmar). Novo campo opcional `zoom` por produto (aproxima peças pequenas no card).
- Os 5 produtos antigos foram guardados em `VELLAR.promotionsArchive` (`js/data.js`), fora do site; fotos continuam na pasta.
- **Sobre nós: áudio trocado por vídeo.** Vídeo enviado pelo usuário (WhatsApp, vertical 464×832, 1:41, 12,5 MB) em `assets/media/sobre-nos.mp4`; capa = quadro do próprio vídeo em `assets/img/sobre-nos-capa.jpg`. Novo campo `about.ratio` ('9/16'): o player vertical ocupa a largura no celular e no máximo ~78% da altura da tela (centralizado no computador). Capa mostra duração, some ao tocar e volta ao terminar. Para voltar ao áudio: `about.type = 'audio'`.
- `dev-server.js` passou a enviar arquivos em partes (Range), como o Netlify: permite avançar o vídeo e tocar no Safari/iPhone durante os testes locais.
- A confirmar: quem fala no vídeo é uma mulher, mas o subtítulo da seção ainda diz "Thiago Alves · fundador" (não alterado; nome dela não informado).

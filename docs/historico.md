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

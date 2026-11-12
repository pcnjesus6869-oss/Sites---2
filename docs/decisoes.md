# Decisões (e porquês)

### Site estático, sem framework nem build
**Por quê:** é um mini site de uma página aberto por QR Code; precisa carregar rápido no celular, ser hospedado de graça e não ter manutenção de servidor. Tailwind via CDN para acelerar o desenvolvimento (compilar para produção ficou como opcional).

### Todo o conteúdo em `js/data.js`
**Por quê:** o usuário vai atualizar conteúdos (semanas, bastidores, parceiros, promoções) com frequência e não é desenvolvedor; separar conteúdo do layout permite trocar textos/links sem tocar em HTML/CSS. Carrosséis, cadeados e botões se ajustam sozinhos à quantidade de itens. Limitação aceita: erro de sintaxe quebra a página. Evoluções sugeridas (não feitas): `.json` com validação; Google Sheets como fonte se alguém não técnico for editar; Supabase/CMS quando houver login e nível por membro.

### Reestruturação de 2026-11-08 seguindo o roteiro do usuário
**Por quê:** o usuário pediu a ordem Sobre nós (áudio/vídeo) → Conteúdos exclusivos → Bastidores → Empresas parceiras → Promoções do QR Code → Links. O Manifesto e o vídeo da coleção da 1ª versão **saíram** por não estarem no roteiro; só a frase "Para quem escolheu não ficar parado." foi mantida no rodapé.

### Alinhamento com os PDFs de estratégia
**Por quê:** os docs definem que o produto é o acesso. Por isso: quatro níveis (MEMBRO/VIP/BLACK/PRIME) em vez de só VIP/BLACK; benefícios de todos os tipos, não só desconto; fundador nomeado (Thiago Alves); conteúdos de novembro = Espiritualidade, terminando na Coleção Conceito Espiritualidade (a "Coleção Presença" inventada na 1ª versão foi abandonada).

### Sobre nós com `about.type` audio|video
**Por quê:** o usuário pediu poder inserir MP3 **ou** MP4. Ficou em áudio porque nenhum arquivo existe ainda; modo prévia evita player quebrado.

### Conteúdos liberados por data (`release`)
**Por quê:** a estratégia é 4 semanas de conteúdo antes da coleção; o cadeado com data cria expectativa e dispensa reeditar o site a cada semana.

### Capas do Instagram salvas no projeto
**Por quê:** URLs de imagem do CDN do Instagram expiram em poucos dias. Sem login só um reel do @comunidadevellar estava acessível; demais reels dependem de o usuário mandar links/capas.

### Fotos reais das peças tiradas do Instagram @vellar.semijoias
**Por quê:** o usuário pediu fotos reais (antes eram ilustrações SVG próprias, que foram removidas). Nomes das peças foram escolhidos pela aparência; materiais, preços e cupons seguem como exemplo.

### Parceiro fictício "Casa Ofício"
**Por quê:** o usuário pediu um exemplo de empresa parceira "na mesma sintonia" da Vellar; café de especialidade + ateliê traduz "menos excesso, mais presença" e mostra benefícios por nível, incluindo o "de segunda a quarta" citado no documento.

### WhatsApp único `5547999728395`, inclusive para "Entrar na Comunidade"
**Por quê:** número informado pelo usuário. Ainda não há grupos criados, então os botões de comunidade abrem conversa com mensagem pronta indicando Masculina/Feminina; trocar `groupLink` pelos convites quando existirem.

### Dois repositórios: Storage-Site---1 (congelado) e Sites---2 (trabalho)
**Por quê:** o usuário quis guardar a versão-base intacta e evoluir em repositório novo. No git local, `origin` = Sites---2 e `storage` = Storage, para que um push comum nunca atinja o Storage.

### Publicação como subpasta `vellarsemijoias/` do repo Sites-1 (Netlify)
**Por quê:** o usuário pediu publicar em `paulonapojesus.netlify.app/vellarsemijoias`; esse domínio do Netlify já publica o Sites-1 (Criare Colchões). Escolhido (via pergunta ao usuário) copiar o Vellar para uma subpasta, sem alterar arquivos da Criare (só uma linha acrescentada no README dela). Consequência: há **duas cópias**; mudanças no Sites---2 precisam ser sincronizadas manualmente para o Sites-1.

### Commits/push só com pedido explícito
**Por quê:** preferência observada do usuário; ele autorizou explicitamente cada envio (Storage, Sites---2, Sites-1).

### 12/11 — Parceiro em destaque com promoção no topo (`promo.highlight`)
**Por quê:** o usuário pediu a promoção de travesseiros da Criare em destaque. Com `highlight: true` a arte da promoção abre o card; `cover` vazio esconde a foto de capa. O título da promoção não é repetido abaixo da arte (já está escrito na imagem).

### 12/11 — Botões do parceiro levam ao WhatsApp do próprio parceiro
**Por quê:** a promoção e o atendimento são da Criare; `featuredPartner.whatsapp` (5547992156344) direciona para a loja, não para a Vellar.

### 12/11 — Sorteio só pelo Instagram
**Por quê:** pedido do usuário; removidos o passo "Toque em…" e o botão de WhatsApp. Data do sorteio exibe `drawNote` ("acompanhe o Instagram") enquanto `drawDate` estiver vazio.

### 12/11 — Push só no Sites---2, sem tocar no Sites-1
**Por quê:** o usuário pediu explicitamente não alterar nada no repositório/site da Criare. Substitui, para esta etapa, a rotina de 08/11 de sincronizar a cópia em `Sites-1/vellarsemijoias/`; o site no Netlify fica desatualizado até nova decisão.

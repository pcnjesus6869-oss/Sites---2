/* ===================================================================
 *  CONTEÚDO EDITÁVEL DO MINI SITE VELLAR
 *  Troque textos, links, mídias e promoções aqui — sem mexer no layout.
 *  Campos marcados com "FICTÍCIO" são exemplos e devem ser substituídos.
 * =================================================================== */
window.VELLAR = {

  /* ---------- Contatos e redes (usados em todo o site) ---------- */
  whatsapp: {
    number: '5547999728395',   // +55 47 9 9972-8395 — formato internacional, só números
    conciergeMsg: 'Olá! Sou membro Vellar e preciso de ajuda com minha peça.',
    promoMsg: 'Olá! Vim pelo QR Code e quero aproveitar a promoção: ',
    partnerMsg: 'Olá! Quero saber mais sobre o benefício do parceiro: ',
  },

  // Aparecem como botões no rodapé. Deixe url vazia ('') para esconder um item.
  links: [
    { icon: 'wa',  label: 'Concierge no WhatsApp', detail: 'Garantia, trocas e cuidados', url: 'whatsapp' },
    { icon: 'ig',  label: '@vellar.semijoias',      detail: 'Coleções e lançamentos',    url: 'https://www.instagram.com/vellar.semijoias/' },
    { icon: 'ig',  label: '@comunidadevellar',      detail: 'Bastidores e comunidade',   url: 'https://www.instagram.com/comunidadevellar/' },
    { icon: 'tt',  label: 'TikTok',                  detail: '',                          url: '' },
    { icon: 'web', label: 'Loja online',             detail: '',                          url: '' },
  ],

  /* ---------- 1. Sobre nós — áudio (MP3) ou vídeo (MP4) ----------
   * type: 'audio' para MP3 ou 'video' para MP4.
   * Coloque o arquivo em assets/media/ e aponte o caminho em src.      */
  about: {
    type: 'audio',                         // 'audio' | 'video'
    src: 'assets/media/sobre-nos.mp3',     // ex.: 'assets/media/sobre-nos.mp4' com type: 'video'
    poster: 'assets/img/campanha-poster.svg', // capa usada quando type for 'video'
    title: 'Quem está por trás da Vellar',
    subtitle: 'Thiago Alves · fundador',
    label: 'Uma mensagem para você',
    // Blocos "quem somos" exibidos abaixo do player (resumo do texto oficial da marca).
    blocks: [
      {
        label: 'Vellar Semijoias',
        title: 'Peças com identidade',
        text: 'Semijoias e acessórios que transmitem beleza, elegância, personalidade e autenticidade. Mais do que vender peças, a Vellar se aproxima de você com coleções, lançamentos, conteúdos e experiências.',
      },
      {
        label: 'Comunidade Vellar',
        title: 'Uma rede para crescer junto',
        text: 'Um ambiente que conecta pessoas, marcas, empresas e empreendedores. Pelo Instagram e pelos grupos de WhatsApp, compartilhamos conhecimento, divulgamos parceiros e criamos oportunidades, em uma rede onde todos contribuem e evoluem.',
        tags: ['Saúde', 'Bem-estar', 'Psicologia', 'Desenvolvimento pessoal', 'Propósito de vida', 'Empreendedorismo'],
      },
    ],
  },

  /* ---------- 2. Conteúdos exclusivos da semana ----------
   * release: data de liberação (AAAA-MM-DD). Antes dela, o card aparece bloqueado.
   * url: link do conteúdo (vídeo, áudio, post). Vazio = "link em breve".       */
  contents: {
    // Ciclo de PSICOLOGIA (funil do Projeto Vellar: identificação antes da venda).
    // Datas e duração dos vídeos são EXEMPLO — ajustar ao calendário real de gravação.
    month: 'Psicologia · Thiago Alves',
    intro: 'Um conteúdo novo por semana, só para membros. Mente, foco e a coragem de funcionar do seu jeito.',
    items: [
      { week: 'Semana 1', stage: 'Identificação',   title: 'Como eu descobri que funcionava diferente?', format: 'Vídeo · 6 min', release: '2026-11-12', url: '' },
      { week: 'Semana 2', stage: 'Aprofundamento',  title: 'O que ninguém me contou sobre construir uma empresa tendo TDAH?', format: 'Vídeo · 7 min', release: '2026-11-19', url: '' },
      { week: 'Semana 3', stage: 'História pessoal', title: 'O que eu aprendi sobre aceitar minha própria forma de funcionar?', format: 'Áudio · 9 min', release: '2026-11-26', url: '' },
      { week: 'Semana 4', stage: 'Conceito',        title: 'Eu transformei tudo isso em algo que quero carregar comigo.', format: 'Vídeo · 5 min', release: '2026-12-03', url: '' },
      { week: 'Fim do ciclo', stage: 'Lançamento',  title: 'Coleção Foco', format: 'Acesso antecipado para membros', release: '2026-12-10', url: '' },
    ],
  },

  /* ---------- 3. Bastidores (Instagram @comunidadevellar) ----------
   * Para adicionar um vídeo: salve a capa em assets/img/bastidores/ e
   * inclua { url, headline, thumb }. A capa do Instagram expira se usada direto. */
  bastidores: {
    profile: 'https://www.instagram.com/comunidadevellar/',
    items: [
      {
        url: 'https://www.instagram.com/comunidadevellar/reel/DeKn9qkPcvo/',
        headline: 'Novas ideias. Novas conexões. Um novo começo por aqui.',
        date: '06 out 2026',
        thumb: 'assets/img/bastidores/DeKn9qkPcvo.jpg',
      },
    ],
  },

  /* ---------- Sorteio (parceria) ----------
   * drawDate: data do sorteio (AAAA-MM-DD). Vazio = "data em breve".
   * steps: como participar — regras são EXEMPLO, confirmar com a Vellar e a Criare. */
  raffle: {
    title: 'Sorteio Vellar × Criare',
    prize: 'Uma peça Vellar Semijoias + um travesseiro Criare de brinde',
    text: 'Para quem cuida do corpo, da mente e do descanso. Uma peça para carregar com você e um travesseiro para noites melhores.',
    // Fotos que se alternam no card (a cada 4 s). position = parte da foto que aparece.
    images: [
      { src: 'assets/img/produtos/colar-ponto-de-luz.jpg', position: 'center' },   // EXEMPLO — trocar pela peça sorteada
      { src: 'assets/img/parceiros/promo-travesseiros.jpg', position: 'center 80%' }, // enquadra só os travesseiros
    ],
    // O sorteio acontece somente pelo Instagram (sem botão de WhatsApp).
    drawDate: '',                          // AAAA-MM-DD; vazio = mostra drawNote
    drawNote: 'acompanhe o Instagram',
    steps: [
      'Você já é membro: escaneou o QR Code da sua caixa.',
      'Siga @vellar.semijoias e @criarecolchoeseacessorios no Instagram.',
    ],
  },

  /* ---------- 4. Empresas parceiras ---------- */
  featuredPartner: {
    name: 'Criare Colchões',
    segment: 'Colchões · Camas · Enxoval',
    city: 'Rua Amazonas, 3815 · Garcia · Blumenau',
    cover: '',   // foto de capa do parceiro (ex.: 'assets/img/parceiros/criare-colchao-cloud.webp'); vazio = a promoção ocupa o topo
    whatsapp: '5547992156344',   // WhatsApp da própria Criare
    instagram: 'https://www.instagram.com/criarecolchoeseacessorios/',
    msg: 'Olá! Sou membro da Comunidade Vellar e vim pelo QR Code.',
    aboutTitle: 'Sobre a Criare',
    // Texto oficial "Sobre a Criare" (enviado pela loja).
    story: [
      'A Criare Colchões acredita que cada pessoa merece noites mais confortáveis e momentos de descanso que contribuam para o seu bem-estar.',
      'Nosso compromisso é oferecer uma experiência de compra diferenciada, com atendimento personalizado, atenção aos detalhes e soluções que valorizam o conforto de cada cliente.',
      'Queremos fazer parte da sua casa, proporcionando mais aconchego, qualidade e bem-estar para você e sua família.',
    ],
    // Promoção de travesseiros — EM DESTAQUE no topo do card, sem valores
    // (a condição é passada na loja/WhatsApp da Criare).
    promo: {
      highlight: true,   // true = a promoção abre o card do parceiro, com a arte em tamanho grande
      label: 'Promoção exclusiva para membros',
      title: 'Travesseiro não é tudo igual. É tudo pessoal.',
      text: 'Descubra qual é o seu tipo de descanso e qual travesseiro foi feito pra você. Membros da Comunidade Vellar têm condição especial em travesseiros na Criare.',
      image: 'assets/img/parceiros/promo-travesseiros.jpg',
      cta: 'Consultar condição',
      msg: 'Olá! Sou membro da Comunidade Vellar e quero saber da promoção de travesseiros.',
    },
    perks: [
      { tier: 'MEMBRO', type: 'Promoção', text: 'Condição especial em travesseiros' },
      { tier: 'MEMBRO', type: 'Sorteio',  text: 'Travesseiro de brinde no sorteio Vellar × Criare' },
    ],
  },

  // type: Desconto | Brinde | Sorteio | Experiência | Evento | Acesso antecipado
  // tier: MEMBRO | VIP | BLACK | PRIME
  communities: {
    masculina: {
      tags: 'Esporte · Academia · Gastronomia · Barbearias · Carros · Eventos',
      groupLink: 'https://wa.me/5547999728395?text=' + encodeURIComponent('Olá! Quero entrar na Comunidade Masculina Vellar.'), // troque pelo convite do grupo quando existir
      benefits: [
        { category: 'Barbearia',   partner: 'Barbearia Navalha', type: 'Desconto',          perk: '20% OFF',        detail: 'no corte + barba, de seg. a qua.', tier: 'MEMBRO' },
        { category: 'Academia',    partner: 'Academia Forja',    type: 'Experiência',       perk: 'Aula experimental', detail: 'com avaliação física',          tier: 'VIP' },
        { category: 'Gastronomia', partner: 'Brasa Hamburgueria', type: 'Brinde',           perk: 'Batata cortesia', detail: 'para os 20 primeiros membros',    tier: 'MEMBRO' },
        { category: 'Carros',      partner: 'Garage 47 Estética', type: 'Sorteio',          perk: 'Polimento completo', detail: 'sorteio mensal na comunidade', tier: 'BLACK' },
        { category: 'Eventos',     partner: 'Arena Padel Club',  type: 'Acesso antecipado', perk: 'Pré-venda',      detail: 'do torneio de dezembro',          tier: 'PRIME' },
      ],
    },
    feminina: {
      tags: 'Beleza · Estética · Moda · Gastronomia · Bem-estar · Eventos',
      groupLink: 'https://wa.me/5547999728395?text=' + encodeURIComponent('Olá! Quero entrar na Comunidade Feminina Vellar.'), // troque pelo convite do grupo quando existir
      benefits: [
        { category: 'Estética',    partner: 'Studio Lumière', type: 'Desconto',          perk: '20% OFF',       detail: 'em limpeza de pele',             tier: 'MEMBRO' },
        { category: 'Bem-estar',   partner: 'Spa Essência',   type: 'Experiência',       perk: 'Ritual relaxante', detail: 'exclusivo para membras',      tier: 'BLACK' },
        { category: 'Moda',        partner: 'Atelier Linho',  type: 'Acesso antecipado', perk: 'Pré-venda',     detail: 'da coleção de verão',            tier: 'VIP' },
        { category: 'Gastronomia', partner: 'Bistrô Alecrim', type: 'Brinde',            perk: 'Sobremesa da casa', detail: 'em qualquer pedido',         tier: 'MEMBRO' },
        { category: 'Eventos',     partner: 'Yoga Raiz',      type: 'Evento',            perk: 'Aulão ao ar livre', detail: 'condição especial para membras', tier: 'PRIME' },
      ],
    },
  },

  /* ---------- 5. Promoções exclusivas do QR Code (Vellar Semijoias) ---------- */
  promotions: {
    endsAt: '2026-11-30T23:59:59-03:00',  // fim da campanha (contagem regressiva)
    // Fotos reais do Instagram @vellar.semijoias (em assets/img/produtos/).
    // Nomes, materiais, preços e cupons são EXEMPLOS — ajustar para o catálogo real.
    items: [
      { name: 'Colar Ponto de Luz',     material: 'Banho de ouro 18k · zircônia', from: 'R$ 189', price: 'R$ 149', badge: '-20%',  coupon: 'QRPONTODELUZ', image: 'assets/img/produtos/colar-ponto-de-luz.jpg' },
      { name: 'Anéis Dourados',         material: 'Banho de ouro 18k',            from: 'R$ 159', price: 'R$ 129', badge: '-20%',  coupon: 'QRANEIS',     image: 'assets/img/produtos/aneis-dourados.jpg' },
      { name: 'Argola Cravejada',       material: 'Banho de ouro 18k · zircônias', from: 'R$ 139', price: 'R$ 139', badge: 'Brinde', note: 'Ganhe um anel na compra', coupon: 'QRARGOLA', image: 'assets/img/produtos/argola-cravejada.jpg' },
      { name: 'Brinco Flor',            material: 'Banho de ouro 18k',            from: 'R$ 119', price: 'R$ 89',  badge: '-25%',  coupon: 'QRFLOR',      image: 'assets/img/produtos/brinco-flor.jpg' },
      { name: 'Corrente Elos',          material: 'Banho de ouro 18k',            from: 'R$ 229', price: 'R$ 199', badge: 'Frete grátis', coupon: 'QRELOS', image: 'assets/img/produtos/corrente-elos.jpg' },
    ],
  },
};

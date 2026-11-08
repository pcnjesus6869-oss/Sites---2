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
    text: 'A Vellar nasceu de uma ideia simples: evoluir é uma escolha diária. A peça que você recebeu é o símbolo físico dessa escolha, e a Comunidade é onde ela ganha força, com pessoas, parceiros e experiências que fazem você avançar.',
  },

  /* ---------- 2. Conteúdos exclusivos da semana ----------
   * release: data de liberação (AAAA-MM-DD). Antes dela, o card aparece bloqueado.
   * url: link do conteúdo (vídeo, áudio, post). Vazio = "link em breve".       */
  contents: {
    month: 'Novembro · Espiritualidade',
    intro: 'Um conteúdo novo por semana, só para membros. A história antes da coleção.',
    items: [
      { week: 'Semana 1', stage: 'Introdução',     title: 'Como a espiritualidade começou a fazer parte da minha vida?', format: 'Vídeo · 6 min', release: '2026-11-02', url: '' },
      { week: 'Semana 2', stage: 'Experiência',    title: 'O que a espiritualidade mudou na minha forma de enxergar a vida?', format: 'Vídeo · 7 min', release: '2026-11-09', url: '' },
      { week: 'Semana 3', stage: 'Aprofundamento', title: 'Como a espiritualidade tem me ajudado a cuidar de mim e da minha vida?', format: 'Áudio · 9 min', release: '2026-11-16', url: '' },
      { week: 'Semana 4', stage: 'Conceito',       title: 'Existe algo que representa aquilo que eu acredito e a pessoa que estou me tornando.', format: 'Vídeo · 5 min', release: '2026-11-23', url: '' },
      { week: 'Fim do mês', stage: 'Lançamento',   title: 'Coleção Conceito Espiritualidade', format: 'Acesso antecipado para membros', release: '2026-11-30', url: '' },
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

  /* ---------- 4. Empresas parceiras ---------- */
  // FICTÍCIO — parceiro de exemplo em destaque
  featuredPartner: {
    name: 'Casa Ofício',
    segment: 'Café de especialidade · Ateliê · Encontros',
    city: 'Rua das Palmeiras, 210 · Centro',
    cover: 'assets/img/parceiro-casa-oficio.svg',
    story: 'Um espaço para desacelerar, criar e conversar sem pressa. Café torrado na casa, mesa compartilhada e encontros mensais sobre propósito e carreira. A mesma sintonia da Vellar: menos excesso, mais presença.',
    perks: [
      { tier: 'MEMBRO', type: 'Brinde',           text: 'Café coado cortesia na primeira visita' },
      { tier: 'MEMBRO', type: 'Desconto',         text: '15% OFF de segunda a quarta' },
      { tier: 'VIP',    type: 'Acesso antecipado', text: 'Inscrição antes de todos nos workshops do mês' },
      { tier: 'BLACK',  type: 'Experiência',      text: 'Degustação privada de cafés para 2 pessoas' },
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

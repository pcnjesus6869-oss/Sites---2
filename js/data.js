/* ===== Conteúdo editável do mini site Vellar =====
 * Troque números, parceiros e peças aqui sem mexer no layout.
 * Para usar fotos reais, preencha `image` com o caminho (ex: "assets/img/colar.jpg").
 */
window.VELLAR = {
  // WhatsApp no formato internacional, só números (ex: 5511999999999)
  whatsapp: {
    concierge: '5511900000000', // número fictício — trocar pelo real
    conciergeMsg: 'Olá! Sou membro Vellar e preciso de ajuda com minha peça.',
    reservaMsg: 'Olá! Quero reservar a peça: ',
  },

  communities: {
    masculina: {
      label: 'Comunidade Masculina',
      tags: 'Barbearias · Academias · Gastronomia · Esporte',
      // link fictício — trocar pelo convite real do grupo
      groupLink: 'https://wa.me/5511900000000?text=' + encodeURIComponent('Olá! Quero entrar na Comunidade Masculina Vellar.'),
      benefits: [
        { category: 'Barbearia', partner: 'Barbearia Navalha', perk: '20% OFF', detail: 'no corte + barba', tier: 'VIP', icon: '✂' },
        { category: 'Academia', partner: 'Academia Forja', perk: '15% OFF', detail: 'no plano trimestral', tier: 'BLACK', icon: '◆' },
        { category: 'Gastronomia', partner: 'Restaurante Brasa', perk: 'Cortesia', detail: 'sobremesa da casa', tier: 'VIP', icon: '✦' },
        { category: 'Esporte', partner: 'Arena Padel Club', perk: '1 aula grátis', detail: 'para novos membros', tier: 'BLACK', icon: '●' },
      ],
    },
    feminina: {
      label: 'Comunidade Feminina',
      tags: 'Estética · Autocuidado · Moda · Bem-estar',
      // link fictício — trocar pelo convite real do grupo
      groupLink: 'https://wa.me/5511900000000?text=' + encodeURIComponent('Olá! Quero entrar na Comunidade Feminina Vellar.'),
      benefits: [
        { category: 'Estética', partner: 'Studio Lumière', perk: '20% OFF', detail: 'em limpeza de pele', tier: 'VIP', icon: '✧' },
        { category: 'Autocuidado', partner: 'Spa Essência', perk: 'Cortesia', detail: 'escalda-pés relaxante', tier: 'BLACK', icon: '❖' },
        { category: 'Moda', partner: 'Atelier Linho', perk: '10% OFF', detail: 'em toda a coleção', tier: 'VIP', icon: '◇' },
        { category: 'Bem-estar', partner: 'Yoga Raiz', perk: '1ª aula grátis', detail: 'em qualquer turma', tier: 'BLACK', icon: '○' },
      ],
    },
  },

  products: [
    { name: 'Colar Presença', material: 'Banho de ouro 18k', price: 'R$ 289', image: 'assets/img/colar-presenca.svg', photo: 'photo-1' },
    { name: 'Anel Essencial', material: 'Prata 925', price: 'R$ 189', image: 'assets/img/anel-essencial.svg', photo: 'photo-4' },
    { name: 'Pulseira Elo', material: 'Banho de ouro 18k', price: 'R$ 249', image: 'assets/img/pulseira-elo.svg', photo: 'photo-2' },
    { name: 'Brinco Ponto', material: 'Banho de ouro 18k', price: 'R$ 159', image: 'assets/img/brinco-ponto.svg', photo: 'photo-6' },
    { name: 'Corrente Firme', material: 'Ródio negro', price: 'R$ 319', image: 'assets/img/corrente-firme.svg', photo: 'photo-5' },
  ],
};

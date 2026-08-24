import { ServiceItem } from '../types';

export const WHATSAPP_PHONE = '5554993386969';
export const WHATSAPP_DISPLAY = '(54) 99338-6969';
export const INSTAGRAM_HANDLE = '@lorien_yoga';
export const INSTAGRAM_URL = 'https://instagram.com/lorien_yoga';
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=R.+Os+Dezoito+do+Forte,+1520+-+S%C3%A3o+Pelegrino,+Caxias+do+Sul+-+RS,+95020-472';
export const FULL_ADDRESS = 'R. Os Dezoito do Forte, 1520 - São Pelegrino, Caxias do Sul - RS, 95020-472';

export function getWhatsAppLink(message?: string): string {
  const defaultText = 'Olá Lorien! Gostaria de informações sobre agendamento e práticas.';
  const text = message ? message : defaultText;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'yoga-tradicional',
    name: 'Yoga Tradicional',
    category: 'yoga',
    badge: 'Solo & Hatha',
    shortDescription: 'Prática de solo focada em respiração, postura, alinhamento biomecânico e serenidade mental.',
    description: 'Aulas personalizadas que combinam posturas (asanas), exercícios de respiração consciente (pranayamas) e relaxamento profundo para equilíbrio integral.',
    benefits: ['Consciência corporal', 'Alívio do estresse diário', 'Flexibilidade e tônus', 'Paz interior'],
    icon: 'Lotus',
    customIconUrl: 'https://i.postimg.cc/hvmkHJpJ/file-000000001b28820ea0b55704a96c2840.png',
  },
  {
    id: 'yoga-aereo',
    name: 'Yoga Aéreo',
    category: 'yoga',
    badge: 'Avançado & Adaptativo',
    shortDescription: 'Prática suspensa com tecido especial, unindo inversões suaves, descompressão da coluna e força.',
    description: 'Adaptação exclusiva do aéreo e do solo na mesma prática. Permite descompressão vertebral, inversões seguras e exploração de novas dimensões de leveza e coragem.',
    benefits: ['Descompressão da coluna', 'Fortalecimento do core', 'Sensação de flutuação', 'Superação e foco'],
    icon: 'AerialSilk',
    customIconUrl: 'https://i.postimg.cc/Gp50pBh9/file-000000004f8c820e881c2dbd7b20a3ed.png',
    highlight: true,
  },
  {
    id: 'acroyoga',
    name: 'Acroyoga',
    category: 'yoga',
    badge: 'Duplas & Confiança',
    shortDescription: 'Fusão lúdica e dinâmica entre acrobacia, sabedoria do yoga e massagem terapêutica.',
    description: 'Prática em dupla que desenvolve confiança mútua, comunicação clara, equilíbrio conjunto e relaxamento terapêutico assistido.',
    benefits: ['Confiança e conexão', 'Equilíbrio e coordenação', 'Trabalho em equipe', 'Ambiente descontraído'],
    icon: 'Users',
    customIconUrl: 'https://i.postimg.cc/Bb1CpHNN/file-00000000d998820eb5736b25b13a22e6.png',
  },
  {
    id: 'yoga-gestantes',
    name: 'Yoga para Gestantes',
    category: 'yoga',
    badge: 'Acolhimento Materno',
    shortDescription: 'Foco exclusivo no alívio de dores lombares, mobilidade pélvica e conexão com o bebê.',
    description: 'Cuidado especializado para cada trimestre gestacional. Posturas adaptadas para amenizar dores na lombar, abrir espaço pélvico e preparar o corpo e a mente para o parto.',
    benefits: ['Alívio de dores lombares', 'Preparo do assoalho pélvico', 'Redução do inchaço', 'Conexão mamãe-bebê'],
    icon: 'Baby',
    customIconUrl: 'https://i.postimg.cc/sxk4Nm2g/file-00000000b0f8820e9b6149fa9242c6d8.png',
    highlight: true,
  },
  {
    id: 'yoga-kids',
    name: 'Yoga Kids',
    category: 'yoga',
    badge: 'Lúdico & Educativo',
    shortDescription: 'Desenvolvimento motor, foco, autoconhecimento e respiração através de histórias e brincadeiras.',
    description: 'Encontros alegres e interativos que ensinam as crianças a reconhecer emoções, respirar com calma e desenvolver coordenação e flexibilidade de forma leve.',
    benefits: ['Concentração e calma', 'Coordenação motora', 'Gestão emocional infantil', 'Criatividade corporal'],
    icon: 'YogaKids',
    customIconUrl: 'https://i.postimg.cc/J0D9XpgX/file-000000001834820eb201cdd15ee83bef.png',
  },
  {
    id: 'reiki',
    name: 'Reiki',
    category: 'terapias',
    badge: 'Energia Vital',
    shortDescription: 'Canalização da energia vital universal para restauração do equilíbrio físico, mental e espiritual.',
    description: 'Terapia integrativa sutil e profunda por imposição das mãos nos centros de força (chakras), promovendo liberação de bloqueios energéticos e relaxamento.',
    benefits: ['Harmonização dos chakras', 'Redução da ansiedade', 'Clareza mental e paz', 'Regeneração energética'],
    icon: 'HandHeart',
    customIconUrl: 'https://i.postimg.cc/sfJJsYNZ/file-000000005fa8820eaa2d1ae853e4d354.png',
  },
  {
    id: 'radiestesia',
    name: 'Radiestesia',
    category: 'terapias',
    badge: 'Alinhamento Energético',
    shortDescription: 'Medição e harmonização de frequências vibracionais através de pêndulo e pranchas terapêuticas.',
    description: 'Identificação de desequilíbrios nos corpos sutis, ambientes e campos energéticos, aplicando correções com gráficos radiônicos para restaurar o fluxo saudável.',
    benefits: ['Diagnóstico sutil', 'Limpeza energética', 'Desbloqueio de fluxos', 'Alinhamento vibracional'],
    icon: 'Compass',
    customIconUrl: 'https://i.postimg.cc/4x6ntPRs/file-000000003ea8820e8a204825d8370959.png',
  },
  {
    id: 'aromaterapia',
    name: 'Aromaterapia',
    category: 'terapias',
    badge: 'Óleos Essenciais Puros',
    shortDescription: 'Uso clínico e intuitivo de aromas botânicos para estimular estados de calma, vitalidade e cura.',
    description: 'Aplicação sinérgica de óleos essenciais terapêuticos 100% puros para agir diretamente no sistema límbico, aliviando tensões e despertando bem-estar.',
    benefits: ['Estímulo do sistema límbico', 'Aromas botânicos puros', 'Alívio de tensão e fadiga', 'Sinergia personalizada'],
    icon: 'Droplets',
    customIconUrl: 'https://i.postimg.cc/c1jkVMgq/file-00000000f280820e85c49c53f94d6c00.png',
  },
  {
    id: 'cristais',
    name: 'Cristaloterapia',
    category: 'terapias',
    badge: 'Frequência Mineral',
    shortDescription: 'Aplicação terapêutica de minerais e cristais no alinhamento e ancoragem dos centros energéticos.',
    description: 'Disposição de pedras e cristais de alta vibração sobre pontos específicos do corpo para amplificar cura, purificação e enraizamento energético.',
    benefits: ['Equilíbrio vibracional', 'Proteção e ancoragem', 'Desobstrução dos meridianos', 'Conexão com a Terra'],
    icon: 'Gem',
    customIconUrl: 'https://i.postimg.cc/CxDjzbxP/file-000000004024820e9b90a3207bc34911.png',
  },
  {
    id: 'cromoterapia',
    name: 'Cromoterapia',
    category: 'terapias',
    badge: 'Frequência de Luz',
    shortDescription: 'Harmonização dos campos sutis através do espectro cromático e das propriedades terapêuticas da luz.',
    description: 'Utilização das ondas e frequências das cores para restaurar o equilíbrio bioenergético dos órgãos e emoções, trazendo vitalidade e tranquilidade.',
    benefits: ['Reequilíbrio celular', 'Acalma a mente agitada', 'Estímulo de centros vitais', 'Terapia suave e não-invasiva'],
    icon: 'ColorWheel',
    customIconUrl: 'https://i.postimg.cc/25d9BVwj/file-000000005cd8820ea113fd1f00546975.png',
  },
  {
    id: 'baralho-cigano',
    name: 'Baralho Cigano',
    category: 'oraculo',
    badge: 'Leitura Terapêutica',
    shortDescription: 'Orientação oracular e reflexão profunda para tomada de decisões, caminhos e autoconhecimento.',
    description: 'Consulta oracular com olhar acolhedor e terapêutico. Clareza para questões cotidianas, relacionamentos, propósito e tomada de decisões conscientes.',
    benefits: ['Clareza em decisões', 'Visão holística dos caminhos', 'Aconselhamento acolhedor', 'Atendimento online ou presencial'],
    pricing: [
      { label: '1 Pergunta Objetiva', price: 'R$ 30,00', detail: 'Resposta direcionada para dúvida pontual' },
      { label: '3 Perguntas Temáticas', price: 'R$ 60,00', detail: 'Aprofundamento em até 3 áreas específicas' },
      { label: 'Consulta Semanal', price: 'R$ 85,00', detail: 'Panorama dos caminhos e orientações da semana' },
      { label: 'Consulta Mensal Completa', price: 'R$ 120,00', detail: 'Mapeamento amplo dos ciclos e setores da vida' },
    ],
    icon: 'TarotCard',
    customIconUrl: 'https://i.postimg.cc/y880TWBQ/file-00000000d9c8820ead049ef5fdd03313.png',
    highlight: true,
  },
];

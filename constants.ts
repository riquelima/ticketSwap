
import { User, Ticket, TradeProposal } from './types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Ana Clara',
    avatar: 'https://i.pravatar.cc/150?u=user1',
    location: 'São Paulo, SP',
    description: 'Amante de festivais de rock e música indie. Sempre em busca de novas experiências musicais!',
    isVerified: true,
  },
  {
    id: 'user2',
    name: 'Bruno Alves',
    avatar: 'https://i.pravatar.cc/150?u=user2',
    location: 'Rio de Janeiro, RJ',
    description: 'Fã de MPB e shows acústicos. Gosto de trocar ingressos para eventos no Rio.',
    isVerified: false,
  },
  {
    id: 'user3',
    name: 'Carla Dias',
    avatar: 'https://i.pravatar.cc/150?u=user3',
    location: 'Belo Horizonte, MG',
    description: 'Viciada em teatro e musicais. Troco ingressos para peças em BH e SP.',
    isVerified: true,
  },
];

export const mockTickets: Ticket[] = [
  {
    id: 'ticket1',
    eventName: 'Indie Fest 2024',
    artist: 'The Strokes',
    venue: 'Autódromo de Interlagos',
    city: 'São Paulo',
    eventDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    ticketType: 'Pista Premium',
    imageUrl: 'https://picsum.photos/seed/ticket1/400/250',
    owner: mockUsers[0],
    desiredTrade: 'Ingresso para Lollapalooza 2025 (Pista)',
  },
  {
    id: 'ticket2',
    eventName: 'Samba de Verão',
    artist: 'Zeca Pagodinho',
    venue: 'Marina da Glória',
    city: 'Rio de Janeiro',
    eventDate: new Date(new Date().setDate(new Date().getDate() + 15)),
    ticketType: 'Pista',
    imageUrl: 'https://picsum.photos/seed/ticket2/400/250',
    owner: mockUsers[1],
    desiredTrade: 'Qualquer show de MPB no Rio',
  },
  {
    id: 'ticket3',
    eventName: 'O Fantasma da Ópera',
    artist: 'Elenco Original',
    venue: 'Teatro Renault',
    city: 'São Paulo',
    eventDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    ticketType: 'Camarote',
    imageUrl: 'https://picsum.photos/seed/ticket3/400/250',
    owner: mockUsers[2],
    desiredTrade: 'Musical "Wicked" ou "Les Misérables"',
  },
  {
    id: 'ticket4',
    eventName: 'Rock in Rio',
    artist: 'Iron Maiden',
    venue: 'Cidade do Rock',
    city: 'Rio de Janeiro',
    eventDate: new Date(new Date().setDate(new Date().getDate() + 90)),
    ticketType: 'VIP',
    imageUrl: 'https://picsum.photos/seed/ticket4/400/250',
    owner: mockUsers[0],
    desiredTrade: 'Ingresso para o dia do Post Malone',
  },
  {
    id: 'ticket5',
    eventName: 'Pop Explosion Tour',
    artist: 'Dua Lipa',
    venue: 'Allianz Parque',
    city: 'São Paulo',
    eventDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    ticketType: 'Pista',
    imageUrl: 'https://picsum.photos/seed/ticket5/400/250',
    owner: mockUsers[2],
    desiredTrade: 'Show da Taylor Swift ou Coldplay',
  },
    {
    id: 'ticket6',
    eventName: 'Festival Sertanejo',
    artist: 'Gusttavo Lima',
    venue: 'Mineirão',
    city: 'Belo Horizonte',
    eventDate: new Date(new Date().setDate(new Date().getDate() + 25)),
    ticketType: 'VIP',
    imageUrl: 'https://picsum.photos/seed/ticket6/400/250',
    owner: mockUsers[1],
    desiredTrade: 'Qualquer show sertanejo em BH ou SP',
  }
];

export const mockProposals: TradeProposal[] = [
    // This can be populated by user actions
];


export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  description: string;
  isVerified: boolean;
}

export interface Ticket {
  id: string;
  eventName: string;
  artist: string;
  venue: string;
  city: string;
  eventDate: Date;
  ticketType: 'Pista' | 'VIP' | 'Camarote' | 'Pista Premium';
  imageUrl: string;
  owner: User;
  desiredTrade: string;
}

export interface TradeProposal {
  id: string;
  offeredTicket: Ticket;
  desiredTicket: Ticket;
  proposer: User;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  message?: string;
}

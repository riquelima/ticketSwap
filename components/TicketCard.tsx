
import React from 'react';
import { Ticket } from '../types';
import { LocationMarkerIcon, CalendarIcon, TicketIcon, VerifiedIcon } from './icons/Icons';
import { useAppContext } from '../App';

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const { handleSelectTicket, currentUser } = useAppContext();

  const daysUntilEvent = Math.ceil((ticket.eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const getUrgencyTag = () => {
    if (daysUntilEvent <= 0) {
      return <span className="absolute top-3 right-3 bg-zinc-400 dark:bg-zinc-600 text-white text-xs font-bold px-3 py-1 rounded-full">Encerrado</span>;
    }
    if (daysUntilEvent <= 3) {
      return <span className="absolute top-3 right-3 bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">Evento em {daysUntilEvent} dias!</span>;
    }
    if (daysUntilEvent <= 7) {
      return <span className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">Próximo</span>;
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group relative border border-zinc-200 dark:border-zinc-700">
      <div className="relative">
        <img src={ticket.imageUrl} alt={ticket.eventName} className="w-full h-52 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        {getUrgencyTag()}
        <div className="absolute bottom-0 left-0 p-5">
          <h3 className="text-white text-xl font-bold">{ticket.eventName}</h3>
          <p className="text-zinc-200 text-sm font-semibold">{ticket.artist}</p>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="space-y-2 text-sm">
            <div className="flex items-center text-zinc-600 dark:text-zinc-300">
              <LocationMarkerIcon className="w-4 h-4 mr-2 text-primary" />
              <span>{ticket.venue}, {ticket.city}</span>
            </div>
            <div className="flex items-center text-zinc-600 dark:text-zinc-300">
              <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
              <span>{ticket.eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center text-zinc-600 dark:text-zinc-300">
              <TicketIcon className="w-4 h-4 mr-2 text-primary" />
              <span>{ticket.ticketType}</span>
            </div>
        </div>
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Busca por:</p>
          <p className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">{ticket.desiredTrade}</p>
        </div>
        <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2 group">
              <img src={ticket.owner.avatar} alt={ticket.owner.name} className="w-9 h-9 rounded-full" />
              <div className="text-sm">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{ticket.owner.name}</span>
                {ticket.owner.isVerified && <VerifiedIcon className="w-4 h-4 inline-block ml-1 text-blue-500" title="Usuário Verificado"/>}
              </div>
            </div>
          <button 
            onClick={() => handleSelectTicket(ticket)}
            disabled={!currentUser || currentUser.id === ticket.owner.id}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-full transition-all duration-300 text-sm disabled:bg-zinc-400 dark:disabled:bg-zinc-600 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:shadow-none"
          >
            Propor Troca
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
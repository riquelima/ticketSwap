
import React, { useState } from 'react';
import { useAppContext } from '../App';
import { Ticket } from '../types';
import { ArrowRightIcon, XIcon } from './icons/Icons';

const TradeModal: React.FC = () => {
    const { currentUser, selectedTicket, tickets, createProposal, setTradeModalOpen } = useAppContext();
    const [selectedUserTicketId, setSelectedUserTicketId] = useState<string>('');
    const [message, setMessage] = useState('');

    if (!selectedTicket || !currentUser) return null;

    const userTickets = tickets.filter(t => t.owner.id === currentUser.id && t.id !== selectedTicket.id);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const offeredTicket = userTickets.find(t => t.id === selectedUserTicketId);
        if (offeredTicket && selectedTicket) {
            createProposal({
                offeredTicket,
                desiredTicket: selectedTicket,
                message,
            });
        }
    };
    
    const TicketPreview: React.FC<{ticket: Ticket, user: string}> = ({ ticket, user }) => (
      <div className="bg-zinc-100 dark:bg-zinc-700/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{user}</p>
          <h4 className="font-bold text-lg text-primary">{ticket.eventName}</h4>
          <p className="font-medium text-zinc-800 dark:text-zinc-200">{ticket.artist}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{ticket.ticketType} - {ticket.city}</p>
      </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-scale-in">
                <div className="p-8 relative">
                    <button onClick={() => setTradeModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">
                        <XIcon className="w-7 h-7" />
                    </button>
                    <h2 className="text-3xl font-bold text-center mb-8">Propor Troca</h2>

                    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center mb-8">
                        <TicketPreview ticket={selectedTicket} user={`${selectedTicket.owner.name} oferece:`} />
                        <div className="flex flex-col items-center justify-center">
                           <ArrowRightIcon className="w-8 h-8 text-zinc-400 dark:text-zinc-500 hidden md:block" />
                           <p className="font-bold text-lg my-2 text-center md:hidden">EM TROCA DE</p>
                        </div>
                         <div className="p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-600 h-full flex flex-col justify-center">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Você oferece:</p>
                             {selectedUserTicketId && userTickets.find(t => t.id === selectedUserTicketId) ? 
                                <TicketPreview ticket={userTickets.find(t => t.id === selectedUserTicketId)!} user="" /> :
                                <p className="text-center text-zinc-500 dark:text-zinc-400">Selecione um ingresso abaixo</p>
                             }
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="userTicket" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-200">Selecione o seu ingresso para a troca:</label>
                                {userTickets.length > 0 ? (
                                    <select
                                        id="userTicket"
                                        value={selectedUserTicketId}
                                        onChange={(e) => setSelectedUserTicketId(e.target.value)}
                                        className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-primary focus:border-primary"
                                        required
                                    >
                                        <option value="" disabled>Escolha um ingresso...</option>
                                        {userTickets.map(ticket => (
                                            <option key={ticket.id} value={ticket.id}>
                                                {ticket.eventName} - {ticket.ticketType}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-center p-4 bg-yellow-100 dark:bg-yellow-500/10 text-yellow-800 dark:text-yellow-300 rounded-lg">Você não possui ingressos disponíveis para troca.</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-200">Adicionar uma mensagem (opcional):</label>
                                <textarea
                                    id="message"
                                    rows={3}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder={`Olá ${selectedTicket.owner.name.split(' ')[0]}, tenho interesse no seu ingresso...`}
                                ></textarea>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end space-x-4">
                            <button type="button" onClick={() => setTradeModalOpen(false)} className="py-2 px-6 rounded-full font-semibold border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                                Cancelar
                            </button>
                            <button type="submit" disabled={!selectedUserTicketId} className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-colors disabled:bg-zinc-400 dark:disabled:bg-zinc-600 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:shadow-none">
                                Enviar Proposta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
             <style>{`
              @keyframes scale-in {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
              .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default TradeModal;
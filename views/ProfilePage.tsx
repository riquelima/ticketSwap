
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../App';
import TicketCard from '../components/TicketCard';
import { VerifiedIcon, LocationMarkerIcon } from '../components/icons/Icons';
import { TradeProposal, Ticket } from '../types';

const ProfilePage: React.FC = () => {
    const { currentUser, tickets, proposals } = useAppContext();
    const [activeTab, setActiveTab] = useState<'listings' | 'proposals'>('listings');

    const userListings = useMemo(() => {
        return tickets.filter(t => t.owner.id === currentUser?.id);
    }, [tickets, currentUser]);
    
    const userProposals = useMemo(() => {
        return proposals.filter(p => p.proposer.id === currentUser?.id || p.desiredTicket.owner.id === currentUser?.id);
    }, [proposals, currentUser]);

    if (!currentUser) {
        return <div className="text-center py-16"><p>Por favor, faça login para ver seu perfil.</p></div>;
    }
    
    const ProposalCard: React.FC<{proposal: TradeProposal}> = ({ proposal }) => {
        const isProposer = proposal.proposer.id === currentUser.id;
        const otherUser = isProposer ? proposal.desiredTicket.owner : proposal.proposer;
        
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-300',
            accepted: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-300',
            rejected: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-300',
            completed: 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-300',
            cancelled: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300',
        };

        const TicketPreview: React.FC<{title: string, eventName: string, ticketType: string}> = ({title, eventName, ticketType}) => (
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{title}</p>
              <p className="font-bold text-zinc-800 dark:text-zinc-100">{eventName}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{ticketType}</p>
            </div>
        );

        return (
            <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-700 space-y-4">
                <div className="flex justify-between items-start gap-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                      {isProposer ? <>Você propôs a troca para <span className="font-semibold text-primary">{otherUser.name}</span></> : <><span className="font-semibold text-primary">{otherUser.name}</span> propôs uma troca para você</>}
                    </p>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyles[proposal.status]} whitespace-nowrap`}>{proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 border-t border-b border-zinc-200 dark:border-zinc-700 py-4">
                    <TicketPreview title="Sua oferta" eventName={isProposer ? proposal.offeredTicket.eventName : proposal.desiredTicket.eventName} ticketType={isProposer ? proposal.offeredTicket.ticketType : proposal.desiredTicket.ticketType} />
                    <div className="flex items-center justify-center text-zinc-400 dark:text-zinc-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                    </div>
                    <TicketPreview title="Ingresso de interesse" eventName={isProposer ? proposal.desiredTicket.eventName : proposal.offeredTicket.eventName} ticketType={isProposer ? proposal.desiredTicket.ticketType : proposal.offeredTicket.ticketType} />
                </div>
                {proposal.message && <p className="text-sm italic text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-700/50 p-3 rounded-lg">"{proposal.message}"</p>}
                {!isProposer && proposal.status === 'pending' && (
                    <div className="flex justify-end space-x-3 pt-2">
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 text-sm rounded-full transition-colors shadow-md hover:shadow-lg">Recusar</button>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 text-sm rounded-full transition-colors shadow-md hover:shadow-lg">Aceitar</button>
                    </div>
                )}
            </div>
        )
    };

    return (
        <div className="space-y-12">
            {/* Profile Header */}
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-32 h-32 rounded-full ring-4 ring-offset-4 dark:ring-offset-zinc-800 ring-primary shadow-lg" />
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <h2 className="text-3xl font-bold">{currentUser.name}</h2>
                        {currentUser.isVerified && <VerifiedIcon className="w-7 h-7 text-blue-500" title="Usuário Verificado" />}
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-zinc-500 dark:text-zinc-400">
                        <LocationMarkerIcon className="w-5 h-5" />
                        <span>{currentUser.location}</span>
                    </div>
                    <p className="mt-4 max-w-lg text-zinc-600 dark:text-zinc-300">{currentUser.description}</p>
                </div>
            </div>

            {/* Tabs */}
            <div>
                <div className="border-b border-zinc-200 dark:border-zinc-700">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('listings')}
                            className={`${activeTab === 'listings' ? 'border-primary text-primary' : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:border-zinc-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors`}
                        >
                            Meus Anúncios
                        </button>
                        <button
                            onClick={() => setActiveTab('proposals')}
                            className={`${activeTab === 'proposals' ? 'border-primary text-primary' : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:border-zinc-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors`}
                        >
                            Minhas Propostas
                        </button>
                    </nav>
                </div>
                <div className="mt-8">
                    {activeTab === 'listings' && (
                        userListings.length > 0 ? (
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {userListings.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
                            </div>
                        ) : (
                            <p className="text-center py-10 text-zinc-500 dark:text-zinc-400">Você ainda não anunciou nenhum ingresso.</p>
                        )
                    )}
                     {activeTab === 'proposals' && (
                        userProposals.length > 0 ? (
                             <div className="space-y-6">
                                {userProposals.map(proposal => <ProposalCard key={proposal.id} proposal={proposal} />)}
                            </div>
                        ) : (
                            <p className="text-center py-10 text-zinc-500 dark:text-zinc-400">Você não tem nenhuma proposta de troca.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
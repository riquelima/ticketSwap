
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../App';
import TicketCard from '../components/TicketCard';
import { SearchIcon } from '../components/icons/Icons';
import { Ticket } from '../types';

const HomePage: React.FC = () => {
    const { tickets } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('date_asc');

    const uniqueCities = useMemo(() => {
        const cities = new Set(tickets.map(t => t.city));
        return Array.from(cities);
    }, [tickets]);

    const filteredAndSortedTickets = useMemo(() => {
        let filtered = tickets.filter(ticket => {
            const lowerCaseSearch = searchTerm.toLowerCase();
            const matchesSearch =
                ticket.eventName.toLowerCase().includes(lowerCaseSearch) ||
                ticket.artist.toLowerCase().includes(lowerCaseSearch) ||
                ticket.city.toLowerCase().includes(lowerCaseSearch);
            
            const matchesCity = cityFilter ? ticket.city === cityFilter : true;
            
            return matchesSearch && matchesCity;
        });

        return filtered.sort((a, b) => {
            switch (sortOrder) {
                case 'date_asc':
                    return a.eventDate.getTime() - b.eventDate.getTime();
                case 'date_desc':
                    return b.eventDate.getTime() - a.eventDate.getTime();
                case 'recent':
                default:
                    // Assuming higher ID means more recent, for mock purposes
                    return parseInt(b.id.replace('ticket', '')) - parseInt(a.id.replace('ticket', ''));
            }
        });
    }, [tickets, searchTerm, cityFilter, sortOrder]);

    return (
        <div className="space-y-12">
            <div className="text-center bg-white dark:bg-zinc-800 p-10 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700">
                <h2 className="text-4xl font-extrabold text-primary mb-2">Encontre seu próximo evento</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">Troque ingressos com segurança e facilidade. A sua próxima experiência está a uma troca de distância.</p>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md p-4 rounded-2xl shadow-md sticky top-[76px] z-40 border border-zinc-200 dark:border-zinc-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    <div className="relative lg:col-span-2">
                        <input
                            type="text"
                            placeholder="Buscar por evento, artista ou cidade..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 border rounded-lg bg-gray-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-primary dark:focus:border-secondary"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"/>
                    </div>
                    <div>
                        <select
                            value={cityFilter}
                            onChange={e => setCityFilter(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-primary dark:focus:border-secondary"
                        >
                            <option value="">Todas as Cidades</option>
                            {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                    </div>
                    <div>
                        <select
                            value={sortOrder}
                            onChange={e => setSortOrder(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-primary dark:focus:ring-secondary focus:border-primary dark:focus:border-secondary"
                        >
                            <option value="date_asc">Data do Evento (Próximos)</option>
                            <option value="date_desc">Data do Evento (Distantes)</option>
                            <option value="recent">Mais Recentes</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Ticket Grid */}
            {filteredAndSortedTickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedTickets.map(ticket => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-zinc-500 dark:text-zinc-400">Nenhum ingresso encontrado.</p>
                    <p className="mt-2 text-zinc-400">Tente ajustar seus filtros ou termo de busca.</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;
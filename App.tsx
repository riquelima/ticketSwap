
import React, { useState, useMemo, createContext, useContext, useCallback } from 'react';
import { mockTickets, mockUsers, mockProposals } from './constants';
import { Ticket, User, TradeProposal, Theme } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './views/HomePage';
import ProfilePage from './views/ProfilePage';
import LoginPage from './views/LoginPage';
import TradeModal from './components/TradeModal';

type AppContextType = {
  theme: Theme;
  toggleTheme: () => void;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  tickets: Ticket[];
  proposals: TradeProposal[];
  createProposal: (proposal: Omit<TradeProposal, 'id' | 'status' | 'proposer'>) => void;
  selectedTicket: Ticket | null;
  handleSelectTicket: (ticket: Ticket | null) => void;
  isTradeModalOpen: boolean;
  setTradeModalOpen: (isOpen: boolean) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export default function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'profile' | 'login'>('home');
  
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [proposals, setProposals] = useState<TradeProposal[]>(mockProposals);
  
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isTradeModalOpen, setTradeModalOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, [theme]);
  
  const login = (user: User) => {
    setCurrentUser(user);
    setActiveView('home');
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('home');
  };

  const createProposal = (proposal: Omit<TradeProposal, 'id' | 'status' | 'proposer'>) => {
    if (!currentUser) return;
    const newProposal: TradeProposal = {
      ...proposal,
      id: `prop${proposals.length + 1}`,
      proposer: currentUser,
      status: 'pending',
    };
    setProposals(prev => [...prev, newProposal]);
    setTradeModalOpen(false);
    // In a real app, show a success notification
  };
  
  const handleSelectTicket = (ticket: Ticket | null) => {
    setSelectedTicket(ticket);
    if(ticket) {
      setTradeModalOpen(true);
    }
  };

  const value = useMemo(() => ({
    theme,
    toggleTheme,
    currentUser,
    login,
    logout,
    tickets,
    proposals,
    createProposal,
    selectedTicket,
    handleSelectTicket,
    isTradeModalOpen,
    setTradeModalOpen
  }), [theme, toggleTheme, currentUser, tickets, proposals, selectedTicket, isTradeModalOpen, handleSelectTicket]);

  const renderView = () => {
    if (!currentUser && activeView !== 'login') {
        return <LoginPage onLogin={() => setActiveView('login')} />;
    }

    switch (activeView) {
      case 'profile':
        return <ProfilePage />;
      case 'login':
        return <LoginPage onLogin={() => setActiveView('home')} />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={value}>
      <div className="flex flex-col min-h-screen">
        <Header setActiveView={setActiveView} />
        <main className="flex-grow container mx-auto px-4 py-8">
            {renderView()}
        </main>
        <Footer />
        {isTradeModalOpen && selectedTicket && <TradeModal />}
      </div>
    </AppContext.Provider>
  );
}

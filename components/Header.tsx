
import React, { useState } from 'react';
import { useAppContext } from '../App';
import { SunIcon, MoonIcon, LoginIcon } from './icons/Icons';

interface HeaderProps {
    setActiveView: (view: 'home' | 'profile' | 'login') => void;
}

const Header: React.FC<HeaderProps> = ({ setActiveView }) => {
    const { theme, toggleTheme, currentUser, logout } = useAppContext();
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div 
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => setActiveView('home')}
                    >
                        <span className="text-2xl">🎟️</span>
                        <h1 className="text-xl font-bold text-primary">TicketSwap Hub</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <nav className="hidden md:flex items-center space-x-6">
                            <button onClick={() => setActiveView('home')} className="font-medium text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors">Início</button>
                        </nav>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-zinc-500 hover:text-primary dark:hover:text-primary-light hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                        </button>
                        {currentUser ? (
                            <div className="relative">
                                <button onClick={() => setMenuOpen(!isMenuOpen)} className="flex items-center space-x-2">
                                    <img src={currentUser.avatar} alt="User Avatar" className="w-9 h-9 rounded-full border-2 border-primary/80" />
                                    <span className="hidden sm:inline font-medium text-zinc-800 dark:text-zinc-200">{currentUser.name.split(' ')[0]}</span>
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-lg py-2 z-50 border border-zinc-200 dark:border-zinc-700">
                                        <button 
                                            onClick={() => { setActiveView('profile'); setMenuOpen(false); }} 
                                            className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                        >
                                            Meu Perfil
                                        </button>
                                        <button 
                                            onClick={() => { logout(); setMenuOpen(false); }} 
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                        >
                                            Sair
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                             <button onClick={() => setActiveView('login')} className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
                                <LoginIcon className="w-5 h-5" />
                                <span>Entrar</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
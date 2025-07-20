
import React, { useState } from 'react';
import { useAppContext } from '../App';
import { mockUsers } from '../constants';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const { login } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a simulation. In a real app, you would make an API call.
        // We'll log in as the first mock user for demonstration.
        if (email && password) {
            setError('');
            login(mockUsers[0]);
            onLogin();
        } else {
            setError('Por favor, preencha todos os campos.');
        }
    };
    
    // Quick login buttons for demonstration
    const handleQuickLogin = (userIndex: number) => {
        login(mockUsers[userIndex]);
        onLogin();
    };


    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-800 p-10 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                        Acesse sua conta
                    </h2>
                    <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
                        ou{' '}
                        <a href="#" className="font-medium text-primary hover:text-primary-dark dark:hover:text-primary-light">
                            crie uma conta gratuitamente
                        </a>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-zinc-300 dark:border-zinc-600 placeholder-zinc-500 dark:placeholder-zinc-400 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-700 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-zinc-300 dark:border-zinc-600 placeholder-zinc-500 dark:placeholder-zinc-400 text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-700 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Senha"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-zinc-300 dark:border-zinc-600 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-900 dark:text-zinc-300">
                                Lembrar-me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary hover:text-primary-dark dark:hover:text-primary-light">
                                Esqueceu sua senha?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-all duration-300 shadow-lg hover:shadow-primary/50"
                        >
                            Entrar
                        </button>
                    </div>
                </form>
                 <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-300 dark:border-zinc-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                                Ou entre como (demo)
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3">
                        <button onClick={() => handleQuickLogin(0)} className="w-full inline-flex justify-center items-center py-2 px-4 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm bg-white dark:bg-zinc-900/50 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                           <img src={mockUsers[0].avatar} className="w-5 h-5 mr-2 rounded-full" alt="" />
                           <span>Entrar como {mockUsers[0].name}</span>
                        </button>
                        <button onClick={() => handleQuickLogin(1)} className="w-full inline-flex justify-center items-center py-2 px-4 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm bg-white dark:bg-zinc-900/50 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                           <img src={mockUsers[1].avatar} className="w-5 h-5 mr-2 rounded-full" alt="" />
                           <span>Entrar como {mockUsers[1].name}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
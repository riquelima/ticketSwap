
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 mt-16">
      <div className="container mx-auto px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
        <p>&copy; {new Date().getFullYear()} TicketSwap Hub. Todos os direitos reservados.</p>
        <p className="text-sm mt-1">Uma plataforma para fãs, por fãs.</p>
      </div>
    </footer>
  );
};

export default Footer;
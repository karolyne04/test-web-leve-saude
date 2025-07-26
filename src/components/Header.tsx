import React from 'react';
import logo from '../assets/logo.png';

interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    return (
        <header className="w-full fixed top-0 left-0 z-30 bg-white shadow-sm border-b border-backgroundLight px-4 md:px-10 py-3 flex items-center justify-between" style={{ minHeight: '64px' }}>
            <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="h-9 w-auto" />
                <span className="text-xl md:text-2xl font-extrabold text-primary tracking-tight select-none">Leve Feedback</span>
            </div>
            <button
                onClick={onLogout}
                className="bg-error hover:bg-errors text-white font-semibold px-4 py-1.5 rounded-md shadow-sm text-sm md:text-base transition border border-error/30 focus:outline-none focus:ring-2 focus:ring-error/40"
            >
                Sair
            </button>
        </header>
    );
};

export default Header; 
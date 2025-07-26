import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import logo from '../assets/logo.png';

interface LoginProps {
    onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onLogin();
        } catch {
            setError('Email ou senha inválidos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-2 md:px-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center border border-backgroundLight">
                <img src={logo} alt="Logo" className="h-20 mb-6" />
                <form onSubmit={handleSubmit} className="w-full">
                    <h2 className="text-3xl font-bold mb-8 text-center text-primary">Entrar</h2>
                    <div className="mb-4 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-lg">@</span>
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full pl-10 pr-3 py-2 border border-backgroundLight rounded-lg bg-backgroundLight text-text placeholder:textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-lg">🔒</span>
                        <input
                            type="password"
                            placeholder="Senha"
                            className="w-full pl-10 pr-3 py-2 border border-backgroundLight rounded-lg bg-backgroundLight text-text placeholder:textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="text-error mb-4 text-sm text-center">{error}</div>}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-secondarys transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
} 
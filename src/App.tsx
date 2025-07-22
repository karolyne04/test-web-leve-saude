import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from './services/firebase';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-400">Carregando...</div>;
  }

  if (!user) {
    return <Login onLogin={() => { }} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-end p-4">
        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>
      <Dashboard />
    </div>
  );
}

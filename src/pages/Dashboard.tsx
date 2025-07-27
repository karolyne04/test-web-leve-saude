import { useEffect, useState, useMemo } from 'react';

import type { DocumentData } from 'firebase/firestore';

import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header';

import { FaSearch } from "react-icons/fa";
import { db } from '../services/firebase';
import {
    collection,
    getDocs,
    getDoc,
    doc as docRef,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
const PAGE_SIZE = 8;

type Feedback = {
    id: string;
    nome: string;
    nota: number;
    comentario: string;
    data: Date;
};


export default function Dashboard() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState<'data' | 'nota'>('data');
    const [orderDir, setOrderDir] = useState<'desc' | 'asc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);



    useEffect(() => {
        async function fetchFeedbacks() {
            setLoading(true);

            const querySnapshot = await getDocs(collection(db, 'feedbacks'));

            const feedbackData = await Promise.all(
                querySnapshot.docs.map(async (doc: QueryDocumentSnapshot<DocumentData>) => {
                    const d = doc.data();

                    let nome = 'Desconhecido';

                    // Busca nome do usuário na coleção 'users'
                    if (d.userId) {
                        try {
                            const userDoc = await getDoc(docRef(db, 'users', d.userId));
                            if (userDoc.exists()) {
                                const userData = userDoc.data();
                                nome = userData.name || 'Desconhecido';
                            }
                        } catch (error) {
                            console.warn('Erro ao buscar usuário:', error);
                        }
                    }

                    const dataConvertida = d.createdAt instanceof Date
                        ? d.createdAt
                        : new Date(d.createdAt.seconds * 1000);

                    return {
                        id: doc.id,
                        nome,
                        nota: d.rating,
                        comentario: d.comment,
                        data: dataConvertida,
                    };
                })
            );

            setFeedbacks(feedbackData);
            setLoading(false);
        }

        fetchFeedbacks();
    }, []);

    const filteredFeedbacks = useMemo(() => {
        let filtered = feedbacks;
        if (search.trim()) {
            const s = search.trim().toLowerCase();
            filtered = filtered.filter(fb =>
                fb.nome.toLowerCase().includes(s) ||
                fb.comentario.toLowerCase().includes(s)
            );
        }
        filtered = [...filtered].sort((a, b) => {
            if (orderBy === 'data') {
                const aTime = a.data?.getTime();
                const bTime = b.data?.getTime();
                return orderDir === 'desc' ? bTime - aTime : aTime - bTime;
            } else {
                return orderDir === 'desc' ? b.nota - a.nota : a.nota - b.nota;
            }
        });
        return filtered;
    }, [feedbacks, search, orderBy, orderDir]);

    // Paginação
    const totalPages = Math.ceil(filteredFeedbacks.length / PAGE_SIZE) || 1;
    const paginatedFeedbacks = filteredFeedbacks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    function handlePageChange(page: number) {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    }

    function handleLogout() {
        signOut(auth);
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-start bg-background px-2 md:px-8 pt-8 pb-16">
            <div className="w-full max-w-5xl">
                <Header onLogout={handleLogout} />
                <h2 className="text-3xl font-bold mb-8 text-left text-primary">Painel de Feedbacks</h2>
                <div className="bg-backgroundLight rounded-xl p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-background">
                    <form
                        className="flex-1 flex gap-2 items-center"
                        onSubmit={e => { e.preventDefault(); }}
                    >

                        <FaSearch color='#212121' />
                        <Input
                            type="text"
                            placeholder="Buscar por nome ou comentário"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full md:w-96 bg-white border border-secondary rounded-lg px-4 py-2 focus:ring-2 focus:ring-secondary focus:border-secondary text-text placeholder:textSecondary shadow-sm"
                        />
                    </form>
                    <div className="flex gap-2 items-center flex-wrap">
                        <select
                            className="rounded-full px-4 py-2 bg-white text-primary border border-primary focus:ring-2 focus:ring-primary focus:border-primary shadow-sm appearance-none cursor-pointer"
                            value={orderDir}
                            onChange={e => setOrderDir(e.target.value as 'desc' | 'asc')}
                        >
                            <option value="desc">Mais recentes</option>
                            <option value="asc">Mais antigos</option>
                        </select>
                        <select
                            className="rounded-full px-4 py-2 bg-white text-primary border border-primary focus:ring-2 focus:ring-primary focus:border-primary shadow-sm appearance-none cursor-pointer"
                            value={orderBy}
                            onChange={e => setOrderBy(e.target.value as 'data' | 'nota')}
                        >
                            <option value="nota">Nota</option>
                            <option value="data">Data</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto bg-white rounded-xl shadow border border-backgroundLight">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-3 px-4 font-semibold text-textSecondary">Nota</th>
                                <th className="py-3 px-4 font-semibold text-textSecondary">Comentário</th>
                                <th className="py-3 px-4 font-semibold text-textSecondary">Usuário</th>
                                <th className="py-3 px-4 font-semibold text-textSecondary">Data</th>

                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="text-center py-8 text-textSecondary">Carregando...</td></tr>
                            ) : paginatedFeedbacks.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-8 text-textSecondary">Nenhum feedback encontrado.</td></tr>
                            ) : (
                                paginatedFeedbacks.map(fb => (
                                    <tr key={fb.id} className="border-b hover:bg-light/50">
                                        <td className="py-3 px-4 text-lg text-star">{'★'.repeat(fb.nota) + '☆'.repeat(5 - fb.nota)}</td>
                                        <td className="py-3 px-4 max-w-xs text-text">{fb.comentario}</td>
                                        <td className="py-3 px-4 text-primary font-medium">{fb.nome}</td>

                                        <td className="py-3 px-4 text-textSecondary">{fb.data.toLocaleDateString('pt-BR')}</td>


                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Paginação */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    <Button type="button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="!px-2 !py-1 bg-backgroundLight text-primary border border-primary disabled:opacity-50">{'<'}</Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold border ${currentPage === i + 1 ? 'bg-primary text-white border-primary' : 'text-primary border-backgroundLight hover:bg-light'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <Button type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="!px-2 !py-1 bg-backgroundLight text-primary border border-primary disabled:opacity-50">{'>'}</Button>
                </div>
            </div>
        </div>
    );
} 
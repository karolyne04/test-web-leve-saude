import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';

type Feedback = {
    id: string;
    nome: string;
    nota: number;
    comentario: string;
    data: { seconds: number; nanoseconds: number };
};

export default function Dashboard() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFeedbacks() {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, 'feedbacks'));
            const data = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
                const d = doc.data();
                return {
                    id: doc.id,
                    nome: d.nome ?? '',
                    nota: d.nota ?? 0,
                    comentario: d.comentario ?? '',
                    data: d.data ?? { seconds: 0, nanoseconds: 0 },
                };
            });
            setFeedbacks(data);
            setLoading(false);
        }
        fetchFeedbacks();
    }, []);

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Feedbacks Recebidos</h2>
            {loading ? (
                <div className="text-center text-gray-400">Carregando...</div>
            ) : (
                <div className="space-y-4">
                    {feedbacks.length === 0 ? (
                        <div className="text-center text-gray-400">Nenhum feedback encontrado.</div>
                    ) : (
                        feedbacks.map((fb) => (
                            <div key={fb.id} className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="font-semibold text-lg text-gray-800">{fb.nome}</div>
                                    <div className="text-gray-600">{fb.comentario}</div>
                                </div>
                                <div className="flex flex-col items-end mt-2 md:mt-0">
                                    <span className="text-purple-600 font-bold text-xl">Nota: {fb.nota}</span>
                                    <span className="text-gray-400 text-sm">{fb.data && new Date(fb.data.seconds * 1000).toLocaleDateString('pt-BR')}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
} 
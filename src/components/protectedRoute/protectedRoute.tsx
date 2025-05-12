'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../supabase/supabaseClient';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push('/login');
            } else {
                setLoading(false);
            }
        };

        checkSession();
    }, [router]);

    if (loading) return <div>Carregando...</div>;

    return <>{children}</>;
}
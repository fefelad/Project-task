import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../components/supabase/supabase';
import Loader from '../shared/ui/Loader/Loader';

interface ProtectedAdminRouteProps {
    children: ReactNode;
}

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: sessionData } = await supabase.auth.getSession();

            const user = sessionData.session?.user;

            if (!user) {
                setIsAdmin(false);
                setIsLoading(false);
                return;
            }

            const { data: adminData, error } = await supabase
                .from('admins')
                .select('id, role')
                .eq('auth_user_id', user.id)
                .eq('role', 'admin')
                .single();

            if (error || !adminData) {
                await supabase.auth.signOut();
                setIsAdmin(false);
                setIsLoading(false);
                return;
            }

            setIsAdmin(true);
            setIsLoading(false);
        };

        checkAdmin();
    }, []);

    if (isLoading) {
        return <Loader text="Проверяем доступ..." fullPage />;
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
}
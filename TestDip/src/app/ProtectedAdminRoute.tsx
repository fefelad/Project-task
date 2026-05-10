import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../components/supabase/supabase';
import { forceLocalLogout } from '../shared/lib/auth/forceLocalLogout';
import Loader from '../shared/ui/Loader/Loader';

interface ProtectedAdminRouteProps {
    children: ReactNode;
}

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const checkAdmin = async () => {
            try {
                const { data: sessionData } = await supabase.auth.getSession();

                const user = sessionData.session?.user;

                if (!user) {
                    if (!isMounted) return;

                    setIsAdmin(false);
                    setIsLoading(false);
                    return;
                }

                const { data: adminData, error } = await supabase
                    .from('admins')
                    .select('id, role')
                    .eq('auth_user_id', user.id)
                    .eq('role', 'admin')
                    .maybeSingle();

                if (!isMounted) return;

                if (error || !adminData) {
                    forceLocalLogout();

                    setIsAdmin(false);
                    setIsLoading(false);
                    return;
                }

                setIsAdmin(true);
                setIsLoading(false);
            } catch (error) {
                console.error('Ошибка проверки админа:', error);

                if (!isMounted) return;

                forceLocalLogout();

                setIsAdmin(false);
                setIsLoading(false);
            }
        };

        checkAdmin();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) {
        return <Loader text="Проверяем доступ..." fullPage />;
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
}
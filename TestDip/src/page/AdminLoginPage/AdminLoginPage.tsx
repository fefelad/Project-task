import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../components/supabase/supabase';
import { forceLocalLogout } from '../../shared/lib/auth/forceLocalLogout';
import { TypographyProvider } from '../../shared/lib/typography/TypographyProvider';
import styles from './AdminLoginPage.module.css';

export default function AdminLoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError('');
        setIsLoading(true);

        try {
            forceLocalLogout();

            const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (loginError || !loginData.user) {
                setError('Неверный email или пароль');
                return;
            }

            const { data: adminData, error: adminError } = await supabase
                .from('admins')
                .select('id, role')
                .eq('auth_user_id', loginData.user.id)
                .eq('role', 'admin')
                .maybeSingle();

            if (adminError || !adminData) {
                forceLocalLogout();

                setError('У вас нет доступа к админке');
                return;
            }

            navigate('/admin', { replace: true });
        } catch (error) {
            console.error('Ошибка входа в админку:', error);

            forceLocalLogout();

            setError('Не удалось войти. Попробуйте ещё раз.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TypographyProvider>
            <div className={styles.page}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Вход в админку</h1>

                <label className={styles.label}>
                    Email
                    <input
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Введите email"
                        autoComplete="email"
                        required
                    />
                </label>

                <label className={styles.label}>
                    Пароль
                    <input
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Введите пароль"
                        autoComplete="current-password"
                        required
                    />
                </label>

                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.button} type="submit" disabled={isLoading}>
                    {isLoading ? 'Входим...' : 'Войти'}
                </button>
            </form>
            </div>
        </TypographyProvider>
    );
}
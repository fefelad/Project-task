import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../components/supabase/supabase';
import styles from './AdminPage.module.css';

export default function AdminPage() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Админка</h1>
                    <p className={styles.subtitle}>Управление сайтом</p>
                </div>

                <button className={styles.logoutButton} onClick={handleLogout}>
                    Выйти
                </button>
            </div>

            <div className={styles.grid}>
                <Link className={styles.card} to="/admin/courses">
                    <h2>Курсы</h2>
                    <p>Добавление и редактирование курсов</p>
                </Link>

                <Link className={styles.card} to="/admin/portfolio">
                    <h2>Портфолио</h2>
                    <p>Добавление работ и фотографий</p>
                </Link>

                <Link className={styles.card} to="/admin/requests">
                    <h2>Заявки</h2>
                    <p>Просмотр заявок и статусов оплаты</p>
                </Link>
            </div>
        </div>
    );
}
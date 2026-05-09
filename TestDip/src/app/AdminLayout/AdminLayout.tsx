import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../components/supabase/supabase';
import styles from './AdminLayout.module.css';

const adminLinks = [
  { to: '/admin', label: 'Главная' },
  { to: '/admin/requests', label: 'Заявки' },
  { to: '/admin/courses', label: 'Курсы' },
  { to: '/admin/portfolio', label: 'Портфолио' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div>
          <h2 className={styles.logo}>Админ панель</h2>

          <nav className={styles.nav}>
            {adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/admin'}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <button className={styles.logoutButton} onClick={handleLogout}>
          Выйти
        </button>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
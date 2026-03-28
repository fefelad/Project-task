import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import logo from '../../../assets/Logo/123123 1.png';
import Text, { TextSizes, TextWeight } from '../Text/Text';
import { Link, NavLink } from 'react-router-dom';
import { AppRoutes } from '../../../app/App';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navRoutes = AppRoutes.filter(
        (route) => route.path !== '/' && !route.path.includes(':')
    );

    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <header className={styles.container_header}>
                <Link to="/" onClick={closeMenu} className={styles.logo_link}>
                    <img src={logo} alt="logo" />
                </Link>

                <nav className={styles.navigation_list}>
                    <ul className={styles.list_item}>
                        {navRoutes.map((route) => (
                            <li className={styles.header_items} key={route.path}>
                                <NavLink
                                    to={route.path}
                                    className={({ isActive }) =>
                                        `${styles.navLink} ${isActive ? styles.active : ''}`
                                    }
                                >
                                    <Text
                                        className={styles.routeName}
                                        size={TextSizes.XL2}
                                        weight={TextWeight.REGULAR}
                                    >
                                        {route.name}
                                    </Text>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    type="button"
                    className={`${styles.burger} ${isMenuOpen ? styles.burger_active : ''}`}
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-drawer-menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </header>

            <div
                className={`${styles.overlay} ${isMenuOpen ? styles.overlay_open : ''}`}
                onClick={closeMenu}
            >
                <aside
                    id="mobile-drawer-menu"
                    className={`${styles.drawer} ${isMenuOpen ? styles.drawer_open : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.drawer_header}>
                        <button
                            type="button"
                            className={styles.close_button}
                            onClick={closeMenu}
                            aria-label="Закрыть меню"
                        >
                            ×
                        </button>
                    </div>

                    <nav className={styles.mobile_navigation}>
                        <ul className={styles.mobile_list}>
                            {navRoutes.map((route) => (
                                <li className={styles.header_items} key={route.path}>
                                    <NavLink
                                        to={route.path}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `${styles.mobile_navLink} ${
                                                isActive ? styles.active_mobile : ''
                                            }`
                                        }
                                    >
                                        <Text
                                            className={styles.routeName}
                                            size={TextSizes.XL2}
                                            weight={TextWeight.REGULAR}
                                        >
                                            {route.name}
                                        </Text>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
            </div>
        </>
    );
}

export default Header;
import styles from './Header.module.css';
import logo from '../../../assets/Logo/123123 1.png';
import Text, { TextSizes, TextWeight } from '../Text/Text';
import { Link, NavLink } from 'react-router-dom';
import { AppRoutes } from '../../../app/App';


function Header() {
    return(
        <>
            <header className={styles.containrer_header}>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <nav className={styles.navigation_list}>
                    <ul className={styles.list_item}>
                        {
                        AppRoutes
                        .filter(route => route.path !== '/')
                        .map((route) =>(
                            <li className={styles.header_items} key={route.path}>
                                <NavLink 
                                    to={route.path}
                                    className={({ isActive }) => 
                                        `${styles.navLink} ${isActive ? styles.active : ''}`
                                    }
                                >
                                    <Text size={TextSizes.XL2} weight={TextWeight.REGULAR}>
                                        {route.name}
                                    </Text>
                                </NavLink>
                            </li>
                        ))
                        }
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;
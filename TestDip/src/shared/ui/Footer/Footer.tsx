import Text from '../Text/Text';
import styles from './Footer.module.css';
import logo from '../../../assets/Logo/logoFinal.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <img className={styles.logo_img} src={logo} alt="logo" />

                <nav className={styles.navAllCol} aria-label="Все страницы">
                    <div className={styles.navAllSubCol}>
                        <Link to="/cours">Курсы</Link>
                        <Link to="/teachers">Преподаватели</Link>
                    </div>
                    <div className={styles.navAllSubCol}>
                        <Link to="/portfolio">Портфолио</Link>
                        <Link to="/about">О школе</Link>
                        <Link to="/contact">Контакты</Link>
                    </div>
                </nav>

                <div className={styles.leftColumn}>
                    <nav className={styles.navColLeft} aria-label="Навигация">
                        <Link to="/cours">Курсы</Link>
                        <Link to="/teachers">Преподаватели</Link>
                    </nav>

                    <div className={styles.legalCol}>
                        <Link to="/privacy" rel="noopener noreferrer">
                            Политика обработки персональных данных
                        </Link>
                    </div>
                </div>

                <div className={styles.colRightStack}>
                    <nav className={styles.navColRight} aria-label="Разделы">
                        <Link to="/portfolio">Портфолио</Link>
                        <Link to="/about">О школе</Link>
                        <Link to="/contact">Контакты</Link>
                    </nav>
                </div>

                <div className={styles.contactsCol}>
                    <Text fontFamily="onest" className={styles.contactsTitle}>
                        Связаться с нами можно
                    </Text>

                    <a href="mailto:znaniya@mail.ru">znaniya@mail.ru</a>

                    <a href="tel:+79326431825">+7 (932) 643 18 25</a>
                </div>
            </div>
        </footer>
    );
};

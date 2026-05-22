import Text from '../Text/Text';
import styles from './Footer.module.css';
import logo from '../../../assets/Logo/logoFinal.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <Text fontFamily="onest" className={styles.logo}>
                    <img className={styles.logo_img} src={logo} alt="logo" />
                </Text>

                <nav className={styles.navColLeft} aria-label="Навигация">
                    <Link to="/cours">Курсы</Link>
                    <Link to="/teachers">Преподаватели</Link>
                </nav>

                <div className={styles.colRightStack}>
                    <nav className={styles.navColRight} aria-label="Разделы">
                        <Link to="/cours">Курсы</Link>
                        <Link to="/teachers">Преподаватели</Link>
                        <Link to="/portfolio">Портфолио</Link>
                        <Link to="/about">О школе</Link>
                        <Link to="/contact">Контакты</Link>
                    </nav>

                    <div className={styles.legalCol}>
                        <Link to="/privacy" rel="noopener noreferrer">
                            Политика обработки персональных данных
                        </Link>
                    </div>
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

import Text from '../Text/Text';
import styles from './Footer.module.css';
import logo from '../../../assets/Logo/logoFinal.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <Text fontFamily="onest" className={styles.logo}>
                    <img src={logo} alt="logo" />
                </Text>

                <nav className={styles.nav}>
                    <a href="#courses">Курсы</a>
                    <a href="#teachers">Преподаватели</a>
                </nav>

                <nav className={styles.nav}>
                    <a href="#portfolio">Портфолио</a>
                    <a href="#about">О школе</a>
                    <a href="#contacts">Контакты</a>
                    <Link
                        to="/privacy"
                        rel="noopener noreferrer"
                    >
                        Политика обработки персональных данных
                    </Link>
                </nav>

                <div className={styles.contacts}>
                    <Text fontFamily="onest" className={styles.contactsTitle}>
                        Связаться с нами можно
                    </Text>

                    <a href="mailto:znaniya@mail.ru">
                        znaniya@mail.ru
                    </a>

                    <a href="tel:+79326431825">
                        +7 (932) 643 18 25
                    </a>
                </div>
            </div>
        </footer>
    );
};
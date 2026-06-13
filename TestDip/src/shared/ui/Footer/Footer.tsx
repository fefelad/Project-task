import Text from '../Text/Text';
import { fixHangingPrepositions } from '../../lib/typography/fixHangingPrepositions';
import styles from './Footer.module.css';
import logo from '../../../assets/Logo/logo1.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <img className={styles.logo_img} src={logo} alt="logo" />

                <nav className={styles.navAllCol} aria-label="Все страницы">
                    <div className={styles.navAllSubCol}>
                        <Link to="/cours">{fixHangingPrepositions('Курсы')}</Link>
                        <Link to="/teachers">{fixHangingPrepositions('Преподаватели')}</Link>
                    </div>
                    <div className={styles.navAllSubCol}>
                        <Link to="/portfolio">{fixHangingPrepositions('Портфолио')}</Link>
                        <Link to="/about">{fixHangingPrepositions('О школе')}</Link>
                        <Link to="/contact">{fixHangingPrepositions('Контакты')}</Link>
                    </div>
                </nav>

                <div className={styles.leftColumn}>
                    <nav className={styles.navColLeft} aria-label="Навигация">
                        <Link to="/cours">{fixHangingPrepositions('Курсы')}</Link>
                        <Link to="/teachers">{fixHangingPrepositions('Преподаватели')}</Link>
                    </nav>

                    <div className={styles.legalCol}>
                        <Link to="/privacy" rel="noopener noreferrer">
                            {fixHangingPrepositions('Политика обработки персональных данных')}
                        </Link>
                    </div>
                </div>

                <div className={styles.colRightStack}>
                    <nav className={styles.navColRight} aria-label="Разделы">
                        <Link to="/portfolio">{fixHangingPrepositions('Портфолио')}</Link>
                        <Link to="/about">{fixHangingPrepositions('О школе')}</Link>
                        <Link to="/contact">{fixHangingPrepositions('Контакты')}</Link>
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


import styles from './Header.module.css';
import logo from '../../../assets/Logo/123123 1.png';
import { HeaderItems } from './HeaderItems';
import Text, { TextSizes } from '../Text/Text';

function Header() {
    return(
        <>
            <header className={styles.containrer_header}>
                <img src={logo} alt="logo" />
                <nav className={styles.navigation_list}>
                    <ul className={styles.list_item}>
                        {
                        HeaderItems.map((item, index) =>(
                            <li className={styles.header_items} key={index}>
                                <a href="#">
                                    <Text size={TextSizes.XL2} weight='medium'>
                                        {item}
                                    </Text>
                                </a>
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
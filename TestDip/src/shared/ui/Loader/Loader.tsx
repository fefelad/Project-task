import styles from './Loader.module.css';

type LoaderSize = 'small' | 'medium' | 'large';

interface LoaderProps {
    text?: string;
    size?: LoaderSize;
    fullPage?: boolean;
    className?: string;
}

function Loader({
    text = 'Загрузка...',
    size = 'medium',
    fullPage = false,
    className = '',
}: LoaderProps) {
    return (
        <div
            className={`
                ${styles.wrapper}
                ${fullPage ? styles.fullPage : ''}
                ${className}
            `}
        >
            <div className={`${styles.dots} ${styles[size]}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
}

export default Loader;
import styles from './Input.module.css';

interface props {
    plasholder: string
}

export default function Input({plasholder}:props) {
    return(
        <div className={styles.InputWrapper}>
            <input placeholder={plasholder} className={styles.Input} type="text" />
        </div>
    )
}
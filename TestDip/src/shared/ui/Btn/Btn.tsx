import styles from './Btn.module.css'

interface BtnProps {
    chidren: string,
    color: string,
    widht: string,
}

export default function Btn({chidren, color, widht }:BtnProps) {
  return (
    <button className={styles.Btn}>{chidren}</button>
  )
}

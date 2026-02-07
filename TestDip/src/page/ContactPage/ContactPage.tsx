import Checkbox from '../../shared/ui/Checkbox/Checkbox';
import Text, { TextSizes } from '../../shared/ui/Text/Text';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  return (
    <div className={styles.ContacPageContainer}>
      <Text className={styles.ContactPageTitle}>
        Контакты
      </Text>
      <div className={styles.MainContentContactPage}>
        <Text fontFamily='onest' size={TextSizes.XL2}>
          Мы находимся в Санкт‑Петербурге и Москве — можно выбрать ближайшую площадку и удобный формат занятий.
        </Text>
        <Text fontFamily='onest' size={TextSizes.XL2}>
          На этой странице собраны адреса филиалов, схема проезда и контакты для записи и уточнения расписания. 
        </Text>
        <Text fontFamily='onest' size={TextSizes.XL2}>
          Если удобнее, напишите заранее — подскажем, как добраться, где припарковаться и что взять с собой на первое занятие.
        </Text>
      </div>
      <div className={styles.checkboxContainer}>
        <div className={styles.checkboxColumn}>
          <Checkbox label='Санкт‑Петербург — Невский проспект, 96'/>
          <Checkbox label='Санкт‑Петербург — Лиговский проспект, 22'/>
        </div>
        <div className={styles.checkboxColumn}>
          <Checkbox label='Москва — ул. Тверская, 15'/>
          <Checkbox label='Москва — ул. Покровка, 8'/>
        </div>
      </div>
    </div>
  )
}

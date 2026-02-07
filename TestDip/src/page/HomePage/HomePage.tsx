
import Btn from '../../shared/ui/Btn/Btn'
import Text, { TextSizes } from '../../shared/ui/Text/Text'
import PopupInfo from '../../shared/ui/PopupInfo/PopupInfo'
import styles from './HomePage.module.css'
import PeopleHomePage from '../../assets/HomePage/peopleHomepage.png';

export default function HomePage() {
  return (
      <>
        <div className={styles.container_homepage}>
          <div className={styles.imageWrapper}>
            <img src={PeopleHomePage} alt="Ребенок" className={styles.peopleImage} />
          </div>
          <Text size={TextSizes.XL9} style={{ lineHeight: '1.3' }}>
            Повысьте уровень ребенка <br/> с помощью нашей
          </Text>
          <div className={styles.schoolsContainer}>
            <div className={styles.schoolsBlock}>
              <Text size={TextSizes.XL9} className={styles.schoolsText}>
                школы
              </Text>
            </div>
            <Text size={TextSizes.XL9}>
              дизайна
            </Text>
          </div>
          <Text size={TextSizes.XL2} className={styles.shoolText_desc}>
            Ваш ребенок освоит основы композиции, цвета и шрифтов <br/> — то, 
            на чем держится и веб‑дизайн, и графика. На занятиях он сделает проекты руками и собирает первые работы в портфолио
          </Text>
          <div className={styles.buttonContainer}>
            <Btn color="blue" className={styles.coursesBtn}>Посмотреть все курсы</Btn>
          </div>
            <PopupInfo color="orange" textSize={TextSizes.BASE} className={styles.popupInfo}>
              Карьера за ребенком
            </PopupInfo>
            <PopupInfo color="blue" textSize={TextSizes.BASE} className={styles.popupInfoBestCourse}>
              Лучшие курсы
            </PopupInfo>
        </div>
      </>
  )
}

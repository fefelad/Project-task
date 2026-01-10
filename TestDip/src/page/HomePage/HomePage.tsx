
import Btn from '../../shared/ui/Btn/Btn'
import Text, { TextSizes } from '../../shared/ui/Text/Text'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
      <>
        <div className={styles.container_homepage}>
          <Text size={TextSizes.XL9}>
            Повысьте уровень ребенка <br/> с помощью нашей
          </Text>
          <Text size={TextSizes.XL9}>
            школы дизайна
          </Text>
          <Text size={TextSizes.xl22}>
            Ваш ребенок освоит основы композиции, цвета и шрифтов — то, 
            на чем держится и веб‑дизайн, и графика. На занятиях он сделает проекты руками и собирает первые работы в портфолио,
          </Text>
          <Btn chidren='Посмотреть все курсы' color={''} widht={''}/>
        </div>
      </>
  )
}

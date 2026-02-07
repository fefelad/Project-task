import Text, { TextSizes, TextWeight } from '../../shared/ui/Text/Text';
import styles from './AboutPage.module.css';
import content1 from '../../assets/AboutPage/1.png';
import content2 from '../../assets/AboutPage/2.png';
import content3 from '../../assets/AboutPage/3.png';
import content4 from '../../assets/AboutPage/4.png';


export default function AboutPage() {
  return (
    <div className={styles.ContainerAboutPage}>
      <Text className={styles.ContainerAboutPageTitle}>
        О нашей школе
      </Text>
      <div className={styles.MainContent}>
        <Text className={styles.TitleText} fontFamily='onest' size={TextSizes.XL2}>
          Мы — школа дизайна для детей 7–12 лет, где творчество превращается в понятный навык 
          и реальный результат. Обучаем веб и графическому дизайну через практику:<br/>
          от первых идей до аккуратных digital‑проектов.
        </Text>
        <div className={styles.ArrowElements}>
          <svg width="691" height="247" viewBox="0 0 691 247" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M673.578 245.625C674.715 246.409 676.272 246.122 677.055 244.985L689.822 226.458C690.606 225.321 690.319 223.764 689.182 222.981C688.045 222.197 686.488 222.484 685.705 223.621L674.357 240.089L657.888 228.741C656.751 227.957 655.194 228.244 654.411 229.381C653.628 230.518 653.914 232.075 655.051 232.858L673.578 245.625ZM0.0991051 63.872C-0.284367 65.1984 0.480029 66.5845 1.80642 66.9679L23.4212 73.2169C24.7476 73.6004 26.1337 72.836 26.5172 71.5096C26.9007 70.1832 26.1363 68.7971 24.8099 68.4136L5.59673 62.859L11.1514 43.6458C11.5349 42.3194 10.7705 40.9333 9.44409 40.5498C8.1177 40.1664 6.73158 40.9308 6.34811 42.2571L0.0991051 63.872ZM674.997 243.567L677.455 243.114C651.775 103.597 529.704 32.3062 391.176 8.91794C252.629 -14.4734 96.6155 9.81072 1.2935 62.3771L2.50075 64.5663L3.708 66.7555C97.8813 14.8226 252.716 -9.38801 390.343 13.8482C527.989 37.0874 647.418 107.546 672.538 244.019L674.997 243.567Z" fill="#FF0000" />
          </svg>
        </div>

        <div className={styles.ColumnsContainer}>
          <div className={styles.ColumFirst}>
            <img className={styles.img} src={content1} alt="people1" />
            <div>
              <Text className={styles.TextClassesShool} fontFamily='onest' weight={TextWeight.MEDIUM} size={TextSizes.XL3}>
                Занятия в нашей школе
              </Text>
              <Text className={styles.TextDesctiption} fontFamily='onest' weight={TextWeight.REGULAR} size={TextSizes.XL2}>
                Занятия проходят онлайн или офлайн, в комфортном темпе <br/>
                и с большим количеством практики. По ходу обучения ребенок собирает готовые работы, 
                а родители видят прогресс по понятным результатам, а не по ощущениям.
              </Text>
            </div>
            <img className={styles.img} src={content3} alt="people3" />
          </div>

          <div className={styles.ColumSecondery}>
            <div>
              <Text className={styles.TextClassesShool} fontFamily='onest' weight={TextWeight.MEDIUM} size={TextSizes.XL3}>
                Помогаем вашим детям
              </Text>
              <Text className={styles.TextDesctiption} fontFamily='onest' weight={TextWeight.REGULAR} size={TextSizes.XL2}>
                Наша школа помогает детям развивать вкус, мышление 
                и уверенность через дизайн — в веб‑направлении и графике. Мы учим не «просто рисовать», а понимать, как работает композиция, цвет, шрифты и идея, чтобы ребенок 
                <br/> мог осознанно создавать свои проекты.
              </Text>
            </div>
            <img className={styles.img} src={content2} alt="people2" />
            <div>
              <Text fontFamily='onest' weight={TextWeight.REGULAR} size={TextSizes.XL2}>
                Мы создавали школу как место, где детям интересно учиться и не страшно ошибаться — 
                потому что именно <br/> так быстрее растут навыки.
              </Text>
            </div>
            <img className={styles.img} src={content4} alt="people4" />
          </div>
        </div>
      </div>
    </div>
  )
}
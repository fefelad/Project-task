import Btn from '../../shared/ui/Btn/Btn';
import Text, { TextSizes } from '../../shared/ui/Text/Text';
import PopupInfo from '../../shared/ui/PopupInfo/PopupInfo';
import styles from './HomePage.module.css';
import PeopleHomePage from '../../assets/HomePage/peopleHomepage.png';
import HomePageCrad from '../../shared/ui/HomePageCard/HomePageCrad';
import { homePageTeachers } from '../../shared/ui/HomePageCard/modal';
import Lenta from '../../assets/HomePage/lenta.svg';
import HomeCoursesBlock from '../../shared/ui/HomeCoursesBlock/HomeCoursesBlock';

import work1 from '../../assets/HomePage/work1.png';
import work2 from '../../assets/HomePage/work2.png';
import work3 from '../../assets/HomePage/work3.png';
import work4 from '../../assets/HomePage/work4.png';
import work5 from '../../assets/HomePage/wokr5.png';


export default function HomePage() {
  return (
    <>
      <div className={styles.container_homepage}>
        <div className={styles.imageWrapper}>
          <img
            src={PeopleHomePage}
            alt="Ребенок"
            className={styles.peopleImage}
          />
        </div>

        <Text size={TextSizes.XL9} style={{ lineHeight: '1.3' }}>
          Повысьте уровень ребенка <br /> с помощью нашей
        </Text>

        <div className={styles.schoolsContainer}>
          <div className={styles.schoolsBlock}>
            <Text size={TextSizes.XL9} className={styles.schoolsText}>
              школы
            </Text>
          </div>

          <Text size={TextSizes.XL9}>дизайна</Text>
        </div>

        <Text size={TextSizes.XL2} className={styles.shoolText_desc}>
          Ваш ребенок освоит основы композиции, цвета и шрифтов <br /> — то,
          на чем держится и веб-дизайн, и графика. На занятиях он сделает проекты руками и собирает первые работы в портфолио
        </Text>

        <div className={styles.buttonContainer}>
          <Btn color="blue" className={styles.coursesBtn}>
            Посмотреть все курсы
          </Btn>
        </div>

        <PopupInfo
          color="orange"
          textSize={TextSizes.BASE}
          className={styles.popupInfo}
        >
          Карьера за ребенком
        </PopupInfo>

        <PopupInfo
          color="blue"
          textSize={TextSizes.BASE}
          className={styles.popupInfoBestCourse}
        >
          Лучшие курсы
        </PopupInfo>
      </div>

      <div className={styles.teacherSection}>
        <Text fontFamily="involve" className={styles.MyTeacher}>
          Наши преподаватели
        </Text>

        <div className={styles.lenta}>
          <img src={Lenta} alt="" />
        </div>

        <div className={styles.teacherGrid}>
          <div className={styles.card1}>
            <HomePageCrad teacher={homePageTeachers[0]} />
          </div>

          <div className={styles.card2}>
            <HomePageCrad teacher={homePageTeachers[1]} />
          </div>

          <div className={styles.centerBtn}>
            <Btn width="100%" color="blue">Все преподаватели</Btn>
          </div>

          <div className={styles.card3}>
            <HomePageCrad teacher={homePageTeachers[2]} />
          </div>

          <div className={styles.card4}>
            <HomePageCrad teacher={homePageTeachers[3]} />
          </div>
        </div>

      </div>
      <div>
        <HomeCoursesBlock />
      </div>

      <div className={styles.containerRow}>
        <div className={styles.wrapperRowOne}>
          <div className={styles.containerText}>
            <Text fontFamily='involve' className={styles.WorkKids}>
              Работы сделанные нашими учениками
            </Text>
            <Text fontFamily='onest' className={styles.WorkKidsDesk}>
              Это не просто домашние задания, а полноценные проекты, которые 
              не стыдно добавить в портфолио. Каждый проект — это решение конкретной задачи
            </Text>
          </div>
          <div className={styles.mainRow}>
            <img src={work1} alt="#" />
            <div className={styles.row1}>
              <img src={work2} alt="#" />
              <img src={work3} alt="#" />
            </div>
          </div>
        </div>

        <div className={styles.row2}>
          <img src={work4} alt="#" />
          <Text className={styles.row2Text} fontFamily='onest'>
            Мы гордимся прогрессом наших учеников! 
              В этих работах — не только навыки, но и первый шаг в профессию
          </Text>
          <img src={work5} alt="#" />
        </div>
      </div>
    </>
  );
}
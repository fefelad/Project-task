import { useNavigate } from 'react-router-dom';

import styles from './HomeCoursesBlock.module.css';
import { courseCards, getInfoTexts } from '../../../page/CoursPage/modal';
import Text from '../Text/Text';
import Card from '../Card/Card';
import Btn from '../Btn/Btn';
import PopupInfo from '../PopupInfo/PopupInfo';
import arrow1 from '../../../assets/HomePage/arrow1.svg';
import arrow2 from '../../../assets/HomePage/arrow2.svg';
import arrow3 from '../../../assets/HomePage/arrow3.svg';

export default function HomeCoursesBlock() {
  const navigate = useNavigate();

  const homeCourses = courseCards.slice(0, 3);

  return (
    <section className={styles.coursesSection}>
      <Text fontFamily="involve" className={styles.title}>
        Курсы для ваших детей
      </Text>

      <div className={styles.coursesGrid}>
        <Text fontFamily="onest" className={styles.descriptionTop}>
          Выберите курс под текущий уровень ребенка — от первых шагов до уверенных
          проектов. Программа выстроена так, чтобы ребенок постепенно осваивал
          ключевые принципы дизайна: композицию, цвет, типографику и работу с идеей.
        </Text>

        <Text fontFamily="involve" className={styles.hashTitle}>
          #Курсы для ваших детей
        </Text>

        <div className={styles.arrows}>
          <img src={arrow1} className={styles.arrow1} alt="" />
          <img src={arrow2} className={styles.arrow2} alt="" />
          <img src={arrow3} className={styles.arrow3} alt="" />
        </div>

        <div className={styles.cardsRow}>
          <div className={styles.card1}>
            <Card
              title={homeCourses[0].title}
              secondtitle={homeCourses[0].secodetitle}
              description={homeCourses[0].description}
              infoTexts={getInfoTexts(homeCourses[0].title)}
              onClick={() => navigate(`/cours/${homeCourses[0].id}`)}
            />
          </div>

          <div className={styles.card2}>
            <Card
              title={homeCourses[1].title}
              secondtitle={homeCourses[1].secodetitle}
              description={homeCourses[1].description}
              infoTexts={getInfoTexts(homeCourses[1].title)}
              onClick={() => navigate(`/cours/${homeCourses[1].id}`)}
            />
          </div>

          <div className={styles.card3}>
            <Card
              title={homeCourses[2].title}
              secondtitle={homeCourses[2].secodetitle}
              description={homeCourses[2].description}
              infoTexts={getInfoTexts(homeCourses[2].title)}
              onClick={() => navigate(`/cours/${homeCourses[2].id}`)}
            />
          </div>
        </div>

        <div className={styles.bestLabel}>
          <PopupInfo color="blue">
            Лучшие детям
          </PopupInfo>
        </div>

        <Text fontFamily="onest" className={styles.descriptionBottom}>
          На занятиях много практики, а результат виден в готовых работах, которые
          можно собрать в небольшое портфолио. Подходит для онлайн и офлайн формата —
          в удобном темпе и с понятной обратной связью.
        </Text>

      </div>
        <div className={styles.buttonWrapper}>
            <Btn color="blue" width="100%">
            Посмотреть все курсы
            </Btn>
        </div>
    </section>
  );
}
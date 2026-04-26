import Text from '../Text/Text';
import styles from './LearningSteps.module.css';

import arrow1 from '../../../assets/CoursePage/CoursePageDeatil/arrow1.svg';
import arrow2 from '../../../assets/CoursePage/CoursePageDeatil/arrow2.svg';
import arrow3 from '../../../assets/CoursePage/CoursePageDeatil/arrow3.svg';
import arrow4 from '../../../assets/CoursePage/CoursePageDeatil/arrow4.svg';

export default function LearningSteps() {
  return (
    <section className={styles.learnSection}>
      <Text fontFamily="involve" className={styles.learnTitle}>
        Чему учится ребенок
      </Text>

      <div className={styles.learnGrid}>
        {/* Шаг 1 */}
        <div className={`${styles.learnCard} ${styles.step1}`}>
          <div className={styles.cardContent}>
            <Text className={styles.cardTitle} fontFamily="onest">
              Шаг 1
            </Text>
            <Text className={styles.cardText} fontFamily="onest">
              Знакомится с основами веб-дизайна и понимает,
              из каких элементов состоит сайт: блоки, кнопки,
              меню и изображения.
            </Text>
          </div>
        </div>

        {/* Шаг 2 */}
        <div className={`${styles.learnCard} ${styles.step2}`}>
          <div className={styles.cardContent}>
            <Text className={styles.cardTitle} fontFamily="onest">
              Шаг 2
            </Text>
            <Text className={styles.cardText} fontFamily="onest">
                Осваивает композицию, цвет и шрифты,
                учится делать дизайн понятным и логичным.
                Понимает, как визуально управлять вниманием пользователя.
            </Text>
          </div>
        </div>

        {/* Шаг 3 */}
        <div className={`${styles.learnCard} ${styles.step3}`}>
          <div className={styles.cardContent}>
            <Text className={styles.cardTitle} fontFamily="onest">
              Шаг 3
            </Text>
           <Text className={styles.cardText} fontFamily="onest">
                Создает первые макеты страниц и учится
                продумывать удобство для пользователя.
                Понимает, как сделать интерфейс логичным и простым в использовании.
            </Text> 
          </div>
        </div>

        {/* Шаг 4 */}
        <div className={`${styles.learnCard} ${styles.step4}`}>
          <div className={styles.cardContent}>
            <Text className={styles.cardTitle} fontFamily="onest">
              Шаг 4
            </Text>
            <Text className={styles.cardText} fontFamily="onest">
                Собирает собственный мини-проект:
                дизайн страницы или сайта и презентует результат.
                Учится объяснять свои решения и уверенно представлять свою работу.
            </Text>
          </div>
        </div>

        {/* Результат */}
        <div className={styles.resultCard}>
          <div className={styles.cardContent}>
            <Text className={styles.cardTitle} fontFamily="onest">
              Чему научится ваш ребенок
            </Text>
            <Text className={styles.cardText} fontFamily="onest">
                Ребенок научится не просто рисовать красивые картинки,
                а мыслить как дизайнер: анализировать задачи, продумывать
                структуру страницы и создавать удобные интерфейсы.
                Он сможет самостоятельно разрабатывать визуальные решения,
                работать с композицией и цветом, а также уверенно
                объяснять свои идеи и защищать проекты.
                Освоит базовые инструменты дизайна и научится работать
                с макетами, понимать принципы пользовательского опыта
                и создавать проекты, которые выглядят современно и понятно.
                В результате у ребенка появится не только первый проект
                в портфолио.
                </Text>
          </div>
        </div>

        {/* Стрелки */}
        <img src={arrow1} className={styles.arrow1} alt="" />
        <img src={arrow2} className={styles.arrow2} alt="" />
        <img src={arrow3} className={styles.arrow3} alt="" />
        <img src={arrow4} className={styles.arrow4} alt="" />
      </div>
    </section>
  );
}
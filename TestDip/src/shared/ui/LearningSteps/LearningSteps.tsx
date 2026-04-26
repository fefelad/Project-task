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
        {/* карточки */}
        <div className={`${styles.learnCard} ${styles.step1}`}>Шаг 1</div>
        <div className={`${styles.learnCard} ${styles.step2}`}>Шаг 2</div>
        <div className={`${styles.learnCard} ${styles.step3}`}>Шаг 3</div>
        <div className={`${styles.learnCard} ${styles.step4}`}>Шаг 4</div>

        {/* результат */}
        <div className={styles.resultCard}>
          Чему научится ваш ребенок
        </div>

        {/* стрелки */}
        <img src={arrow1} className={styles.arrow1} alt="" />
        <img src={arrow2} className={styles.arrow2} alt="" />
        <img src={arrow3} className={styles.arrow3} alt="" />
        <img src={arrow4} className={styles.arrow4} alt="" />
      </div>
    </section>
  );
}
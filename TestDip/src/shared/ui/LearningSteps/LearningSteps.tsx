import Text from '../Text/Text';
import styles from './LearningSteps.module.css';

import arrow1 from '../../../assets/CoursePage/CoursePageDeatil/arrow1.svg';
import arrow2 from '../../../assets/CoursePage/CoursePageDeatil/arrow2.svg';
import arrow3 from '../../../assets/CoursePage/CoursePageDeatil/arrow3.svg';
import arrow4 from '../../../assets/CoursePage/CoursePageDeatil/arrow4.svg';

interface LearningStepsProps {
    steps: [string, string, string, string];
    resultText: string;
}

const STEP_CLASS_NAMES = [
    styles.step1,
    styles.step2,
    styles.step3,
    styles.step4,
] as const;

export default function LearningSteps({ steps, resultText }: LearningStepsProps) {
    return (
        <section className={styles.learnSection}>
            <Text fontFamily="involve" className={styles.learnTitle}>
                Чему учится ребенок
            </Text>

            <div className={styles.learnGrid}>
                {steps.map((stepText, index) => (
                    <div
                        key={index}
                        className={`${styles.learnCard} ${STEP_CLASS_NAMES[index]}`}
                    >
                        <div className={styles.cardContent}>
                            <Text className={styles.cardTitle} fontFamily="onest">
                                Шаг {index + 1}
                            </Text>
                            <Text className={styles.cardText} fontFamily="onest">
                                {stepText}
                            </Text>
                        </div>
                    </div>
                ))}

                <div className={styles.resultCard}>
                    <div className={styles.cardContent}>
                        <Text className={styles.cardTitle} fontFamily="onest">
                            Чему научится ваш ребенок
                        </Text>
                        <Text className={styles.cardText} fontFamily="onest">
                            {resultText}
                        </Text>
                    </div>
                </div>

                <img src={arrow1} className={styles.arrow1} alt="Стрелка" />
                <img src={arrow2} className={styles.arrow2} alt="Стрелка" />
                <img src={arrow3} className={styles.arrow3} alt="Стрелка" />
                <img src={arrow4} className={styles.arrow4} alt="Стрелка" />
            </div>
        </section>
    );
}

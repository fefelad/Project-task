import { useNavigate } from 'react-router-dom';
import Text, { TextSizes, TextWeight } from '../Text/Text';
import styles from './CardTeacher.module.css';
import Btn from '../Btn/Btn';
import Feedback from '../FeedbackBlock/Feedback';
import {teachers } from './modal/teacher.ts'

export default function CardTeacher() {
  const navigate = useNavigate();

  const handleTeacherClick = (teacherId: string) => {
    navigate(`/teachers/${teacherId}`);
  };

  return (
    <>
      <div className={styles.CardTeacherWrapper}>
        {teachers.map((teacher) => (
          <div key={teacher.id} className={styles.CardTeacher}>
            <img className={styles.ImgTeacher} src={teacher.image} alt={teacher.name} />

            <div className={styles.CardTeacherContent}>
              <Text
                className={styles.TeacherName}
                fontFamily="involve"
                size={TextSizes.XL3}
                weight={TextWeight.MEDIUM}
              >
                {teacher.name}
              </Text>

              <Text
                className={styles.TeacherDescDesktop}
                fontFamily="onest"
                size={TextSizes.XL2}
                weight={TextWeight.REGULAR}
              >
                {teacher.descriptionDesktop}
              </Text>

              <div className={styles.TeacherDescMobile}>
                {teacher.descriptionMobile.map((paragraph, index) => (
                  <Text
                    key={index}
                    className={styles.TeacherDesc}
                    fontFamily="onest"
                    size={TextSizes.XL2}
                    weight={TextWeight.REGULAR}
                  >
                    {paragraph}
                  </Text>
                ))}
              </div>

              <div className={styles.BtnFooterContent}>
                <Btn
                  color="blue"
                  width="355px"
                  className={styles.BtnFooter}
                  onClick={() => handleTeacherClick(teacher.id)}
                >
                  Подробнее
                </Btn>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Feedback
          title="Поможем раскрыть талант вашего ребёнка!"
          fullWidth={true}
          textBtn="Записаться на пробное занятие"
        >
          Запишитесь на бесплатный пробный урок. Определим сильные стороны вашего
          ребенка и подберём идеальное направление для развития
        </Feedback>
      </div>
    </>
  );
}
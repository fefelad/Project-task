import { useNavigate } from 'react-router-dom';
import Text, { TextSizes, TextWeight } from '../Text/Text';
import styles from './CardTeacher.module.css';
import ImgAlexsandra from '../../../assets/TeacherPage/image 65.png';
import ImgMark from '../../../assets/TeacherPage/Mark.png';
import ImgVera from '../../../assets/TeacherPage/Vera.png';
import Btn from '../Btn/Btn';
import Feedback from '../FeedbackBlock/Feedback';

export default function CardTeacher() {
  const navigate = useNavigate();

  // Переделать в будущем, не оч норм, вот так текст рендерить
  const teachers = [
    {
      id: 'aleksandra-volkova',
      name: 'Александра Волкова',
      image: ImgAlexsandra,
      descriptionDesktop:
        'Опытный практикующий дизайнер, который научит вас не только теории, но и реальным инструментам индустрии. Её подход сочетает развитие творческого мышления с точным пониманием пользовательского опыта. На занятиях царит вдохновляющая атмосфера, где рождаются смелые проекты. Вы получите не просто знания, а готовое портфолио для старта карьеры.',
      descriptionMobile: [
        'Опытный практикующий дизайнер, который научит вас не только теории, но и реальным инструментам индустрии.',
        'Её подход сочетает развитие творческого мышления с точным пониманием пользовательского опыта. На занятиях царит вдохновляющая атмосфера, где рождаются смелые проекты.',
        'Вы получите не просто знания, а готовое портфолио для старта карьеры.'
      ]
    },
    {
      id: 'mark-belov',
      name: 'Марк Белов',
      image: ImgMark,
      descriptionDesktop:
        'Преподаватель, который помогает превратить креативные идеи в рабочие дизайн-решения и сильное портфолио. Его уроки — это погружение в актуальные тренды и отточенное владение современными программами. Каждое занятие — это шаг к созданию проекта, которым не стыдно похвастаться. Идеальный наставник для тех, кто ценит структуру и конкретный результат.',
      descriptionMobile: [
        'Преподаватель, который помогает превратить креативные идеи в рабочие дизайн-решения и сильное портфолио.',
        'Его уроки — это погружение в актуальные тренды и отточенное владение современными программами. Каждое занятие — это шаг к созданию проекта, которым не стыдно похвастаться.',
        'Идеальный наставник для тех, кто ценит структуру и конкретный результат.'
      ]
    },
    {
      id: 'vera-shilina',
      name: 'Вера Шилина',
      image: ImgVera,
      descriptionDesktop:
        'Преподавательница, вдохновляющая на смелые эксперименты и поиск уникального визуального языка. Она верит, что лучший дизайн рождается на стыке эстетики и глубокого понимания аудитории. Её занятия — это творческая лаборатория, где вы научитесь творить и критически оценивать свою работу.',
      descriptionMobile: [
        'Преподавательница, вдохновляющая на смелые эксперименты и поиск уникального визуального языка.',
        'Она верит, что лучший дизайн рождается на стыке эстетики и глубокого понимания аудитории.',
        'Её занятия — это творческая лаборатория, где вы научитесь творить и критически оценивать свою работу.'
      ]
    }
  ];

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
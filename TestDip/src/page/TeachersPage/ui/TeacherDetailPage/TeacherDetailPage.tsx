import { useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Text, { TextSizes, TextWeight } from '../../../../shared/ui/Text/Text';
import Btn from '../../../../shared/ui/Btn/Btn';
import Card from '../../../../shared/ui/Card/Card';
import styles from './TeacherDetailPage.module.css';
import { courseCards, getInfoTexts } from '../../../CoursPage/modal';
import { getTeacherById } from '../modal/modal';

export default function TeacherDetailPage() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const teacher = getTeacherById(teacherId);

  const teacherCourses = useMemo(() => {
    if (!teacher?.courseIds?.length) return [];

    return courseCards.filter(course => teacher.courseIds?.includes(course.id));
  }, [teacher]);

  const scrollCourses = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    const firstCard = sliderRef.current.querySelector(
      `.${styles.courseSlide}`
    ) as HTMLDivElement | null;

    const scrollAmount = firstCard ? firstCard.offsetWidth + 20 : 420;

    sliderRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!teacher) {
    return (
      <div className={styles.notFound}>
        <Text size={TextSizes.XL3}>Преподаватель не найден</Text>
        <Btn color="blue" onClick={() => navigate('/teachers')}>
          Вернуться к списку преподавателей
        </Btn>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Btn color="blue" onClick={() => navigate('/teachers')}>
          ← Назад к списку
        </Btn>
      </div>

      <div className={styles.teacherWrapper}>
        <div className={styles.teacherHero}>
          <div className={styles.leftColumn}>
            <div className={styles.imageSection}>
              <img
                src={teacher.image}
                alt={teacher.name}
                className={styles.image}
              />
            </div>

            <div className={styles.videoButtonWrap}>
              <Btn color="blue" width="100%">
                Видеовизитка
              </Btn>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.teacherTitle}>
              <Text
                size={TextSizes.XL}
                weight={TextWeight.BOLD}
                className={styles.name}
                fontFamily="involve"
              >
                {teacher.name}
              </Text>

              <span className={styles.palka}>|</span>

              <Text
                size={TextSizes.XL2}
                weight={TextWeight.MEDIUM}
                className={styles.role}
              >
                {teacher.role}
              </Text>
            </div>

            <div className={styles.infoGrid}>
              <div className={`${styles.infoBlock} ${styles.educationBlock}`}>
                <Text
                  weight={TextWeight.MEDIUM}
                  size={TextSizes.XL2}
                  className={styles.blockTitle}
                >
                  Образование
                </Text>

                {teacher.education.map((edu, index) => (
                  <div key={index} className={styles.educationItem}>
                    <Text weight={TextWeight.MEDIUM}>— {edu.institution}</Text>
                    <Text className={styles.specialization}>
                      Направление: {edu.specialization}
                    </Text>
                  </div>
                ))}
              </div>

              <div
                className={`${styles.infoBlock} ${styles.qualificationsBlock}`}
              >
                <Text
                  weight={TextWeight.MEDIUM}
                  size={TextSizes.XL2}
                  className={styles.blockTitle}
                >
                  Повышение квалификации
                </Text>

                <ul className={styles.qualificationsList}>
                  {teacher.qualifications.map((qual, index) => (
                    <li key={index}>
                      <Text>• {qual}</Text>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${styles.infoBlock} ${styles.pathBlock}`}>
                <Text
                  weight={TextWeight.MEDIUM}
                  size={TextSizes.XL2}
                  className={styles.blockTitle}
                >
                  Профессиональный путь
                </Text>

                <div className={styles.textGroup}>
                  {teacher.professionalPath.split('\n').map((item, index) => (
                    <Text key={index}>{item}</Text>
                  ))}
                </div>
              </div>

              <div className={`${styles.infoBlock} ${styles.approachBlock}`}>
                <Text
                  weight={TextWeight.MEDIUM}
                  size={TextSizes.XL2}
                  className={styles.blockTitle}
                >
                  Как строит обучение
                </Text>

                <Text className={styles.textParagraph}>
                  {teacher.teachingApproach}
                </Text>

                <div className={styles.learningPoints}>
                  <Text weight={TextWeight.MEDIUM}>Дети:</Text>
                  <ul className={styles.learningList}>
                    {teacher.learningPoints.map((point, index) => (
                      <li key={index}>
                        <Text>— {point}</Text>
                      </li>
                    ))}
                  </ul>
                </div>

                {teacher.approachNote && (
                  <Text className={styles.approachNote}>
                    {teacher.approachNote}
                  </Text>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.teacherCoursesSection}>
        <div className={styles.sectionHead}>
          <Text fontFamily="involve" className={styles.coursesTitle}>
            Курсы преподавателя
          </Text>

          {teacherCourses.length > 1 && (
            <div className={styles.sliderButtons}>
              <button
                type="button"
                className={styles.sliderButton}
                onClick={() => scrollCourses('left')}
              >
                ←
              </button>
              <button
                type="button"
                className={styles.sliderButton}
                onClick={() => scrollCourses('right')}
              >
                →
              </button>
            </div>
          )}
        </div>

        {teacherCourses.length > 0 ? (
          <div ref={sliderRef} className={styles.coursesTrack}>
            {teacherCourses.map(card => (
              <div key={card.id} className={styles.courseSlide}>
                <Card
                  title={card.title}
                  secondtitle={card.secodetitle}
                  description={card.description}
                  infoTexts={getInfoTexts(card.title)}
                  onClick={() => navigate(`/cours/${card.id}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyCourses}>
            <Text>Для этого преподавателя пока не добавлены курсы.</Text>
          </div>
        )}
      </div>
    </div>
  );
}
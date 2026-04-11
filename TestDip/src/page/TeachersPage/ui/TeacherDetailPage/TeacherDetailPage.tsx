import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import Text, { TextSizes, TextWeight } from '../../../../shared/ui/Text/Text';
import Btn from '../../../../shared/ui/Btn/Btn';
import Card from '../../../../shared/ui/Card/Card';
import styles from './TeacherDetailPage.module.css';
import { courseCards, getInfoTexts } from '../../../CoursPage/modal';
import { getTeacherById } from '../modal/modal';

export default function TeacherDetailPage() {
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const teacher = getTeacherById(teacherId);

  const teacherCourses = useMemo(() => {
    if (!teacher?.courseIds?.length) return [];

    return courseCards.filter(course => teacher.courseIds?.includes(course.id));
  }, [teacher]);

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
        </div>

        {teacherCourses.length > 0 ? (
          <>
            <Swiper
              modules={[Navigation, A11y]}
              className={styles.teacherCoursesSwiper}
              navigation={{
                prevEl: '.teacher-courses-prev',
                nextEl: '.teacher-courses-next',
              }}
              spaceBetween={20}
              slidesPerView={3}
              slidesPerGroup={3}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {teacherCourses.map(card => (
                <SwiperSlide key={card.id} className={styles.courseSlide}>
                  <Card
                    title={card.title}
                    secondtitle={card.secodetitle}
                    description={card.description}
                    infoTexts={getInfoTexts(card.title)}
                    onClick={() => navigate(`/cours/${card.id}`)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.bottomNavigation}>
              <button
                type="button"
                className={`${styles.bottomNavButton} teacher-courses-prev`}
                aria-label="Предыдущие курсы"
              >
                <svg
                  className={styles.bottomNavIcon}
                  width="106"
                  height="15"
                  viewBox="0 0 106 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0.2929 8.07039C-0.0976257 7.67986 -0.0976257 7.0467 0.2929 6.65617L6.65686 0.292213C7.04739 -0.0983109 7.68055 -0.0983109 8.07108 0.292213C8.4616 0.682738 8.4616 1.3159 8.07108 1.70643L2.41422 7.36328L8.07108 13.0201C8.4616 13.4107 8.4616 14.0438 8.07108 14.4343C7.68055 14.8249 7.04739 14.8249 6.65686 14.4343L0.2929 8.07039ZM106 7.36328V8.36328H1.00001V7.36328V6.36328H106V7.36328Z"
                    fill="black"
                  />
                </svg>
              </button>

              <button
                type="button"
                className={`${styles.bottomNavButton} teacher-courses-next`}
                aria-label="Следующие курсы"
              >
                <svg
                  className={styles.bottomNavIcon}
                  width="106"
                  height="15"
                  viewBox="0 0 106 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M105.707 8.07039C106.098 7.67986 106.098 7.0467 105.707 6.65617L99.3431 0.292213C98.9526 -0.0983109 98.3195 -0.0983109 97.9289 0.292213C97.5384 0.682738 97.5384 1.3159 97.9289 1.70643L103.586 7.36328L97.9289 13.0201C97.5384 13.4107 97.5384 14.0438 97.9289 14.4343C98.3195 14.8249 98.9526 14.8249 99.3431 14.4343L105.707 8.07039ZM0 7.36328V8.36328H105V7.36328V6.36328H0V7.36328Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyCourses}>
            <Text>Для этого преподавателя пока не добавлены курсы.</Text>
          </div>
        )}
      </div>
    </div>
  );
}
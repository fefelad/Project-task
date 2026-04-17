import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import Text, { TextSizes } from '../../../../shared/ui/Text/Text';
import Card from '../../../../shared/ui/Card/Card';
import { courseCards, getInfoTexts } from '../../modal';
import Btn from '../../../../shared/ui/Btn/Btn';
import Feedback from '../../../../shared/ui/FeedbackBlock/Feedback';

import photoCur1 from './../../../../assets/CoursePage/CoursePageDeatil/photo1DetailCours.png';
import photoCur2 from './../../../../assets/CoursePage/CoursePageDeatil/photo2DetailCours.png';
import Carusel1 from './../../../../assets/CoursePage/CoursePageDeatil/carusel1.png';
import Carusel2 from './../../../../assets/CoursePage/CoursePageDeatil/carusel2.png';
import Carusel3 from './../../../../assets/CoursePage/CoursePageDeatil/carusel3.png';

import styles from './CourseDetailPage.module.css';

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const card = courseCards.find(c => c.id === parseInt(courseId || '0'));

  if (!card) return <div>Курс не найден</div>;

  const lessonSlides = [
    Carusel1,
    Carusel2,
    Carusel3,
    Carusel2,
    Carusel1,
    Carusel3,
  ];

  return (
    <div className={styles.container}>
      <Btn onClick={() => navigate('/cours')} color="blue" hasBackground={false}>
        Назад к курсам
      </Btn>

      <div className={styles.cardWrapper}>
        <Card
          title={card.title}
          secondtitle={card.secodetitle}
          description={card.description}
          infoTexts={getInfoTexts(card.title)}
          widthPercent={80}
        />

        <div className={styles.contentBlock}>
          <Text fontFamily="onest" className={styles.DetailCardDecription}>
            Ребенок учится видеть в изображении структуру, а не просто красивую картинку.
            Он начинает понимать, из чего состоит визуальная работа и почему одни решения
            выглядят гармонично, а другие — нет.
          </Text>

          <div className={styles.WrapperColums}>
            <div className={styles.WrapperColumsOne}>
              <div className={styles.imageBox}>
                <img
                  src={photoCur1}
                  alt="Фото курса 1"
                  className={styles.coursePhoto}
                />
              </div>

              <div className={styles.WrapperText}>
                <Text className={styles.hestag} size={TextSizes.XL2} fontFamily="onest">
                  #ЮныйВебДизайнер
                </Text>
                <Text className={styles.hestag} size={TextSizes.XL2} fontFamily="onest">
                  #ГрафДизайнДетям
                </Text>
              </div>

              <div className={styles.buttonWrapper}>
                <Btn color="orange" width="100%">
                  Записаться на курс
                </Btn>
              </div>
            </div>

            <div className={styles.secondImageBox}>
              <img
                src={photoCur2}
                alt="Фото курса 2"
                className={styles.coursePhoto}
              />
            </div>
          </div>
        </div>
      </div>

      <section className={styles.stepsSection}>
        <Text className={styles.CoursInfoStep}>
          Как проходят занятия
        </Text>

        <Swiper
          modules={[Navigation, A11y]}
          className={styles.courseStepsSwiper}
          navigation={{
            prevEl: '.course-steps-prev',
            nextEl: '.course-steps-next',
          }}
          loop={true}
          spaceBetween={20}
          slidesPerView={3}
          slidesPerGroup={1}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            380:{
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {lessonSlides.map((slide, index) => (
            <SwiperSlide key={index} className={styles.courseStepSlide}>
              <div className={styles.slideCard}>
                <img
                  src={slide}
                  alt={`Слайд ${index + 1}`}
                  className={styles.slideImage}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* стрелки по центру */}
        <div className={styles.bottomNavigation}>
          <button
            type="button"
            className={`${styles.bottomNavButton} course-steps-prev`}
            aria-label="Предыдущий слайд"
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
            className={`${styles.bottomNavButton} course-steps-next`}
            aria-label="Следующий слайд"
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
      </section>

      <Feedback
        fullWidth
        title="Если не смогли найти нужную информацию"
        textBtn="Отправить свои данные"
      >
        Наш оператор свяжется с вами в течении часа. Ответы на все ваши вопросы, которые будут.
      </Feedback>
    </div>
  );
}
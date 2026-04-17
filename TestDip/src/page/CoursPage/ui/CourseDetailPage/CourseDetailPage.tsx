import { useParams, useNavigate } from 'react-router-dom';

import Text, { TextSizes } from '../../../../shared/ui/Text/Text';
import Card from '../../../../shared/ui/Card/Card';
import { courseCards, getInfoTexts } from '../../modal';
import Btn from '../../../../shared/ui/Btn/Btn';
import photoCur1 from './../../../../assets/CoursePage/CoursePageDeatil/photo1DetailCours.png'
import photoCur2 from './../../../../assets/CoursePage/CoursePageDeatil/photo2DetailCours.png'
import Carusel1 from './../../../../assets/CoursePage/CoursePageDeatil/carusel1.png'
import Carusel2 from './../../../../assets/CoursePage/CoursePageDeatil/carusel2.png'
import Carusel3 from './../../../../assets/CoursePage/CoursePageDeatil/carusel3.png'



import styles from './CourseDetailPage.module.css';


export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const card = courseCards.find(c => c.id === parseInt(courseId || '0'));
  if (!card) return <div>Курс не найден</div>;

  return (
    <div className={styles.container}>
      <Btn onClick={() => navigate('/cours')} color='blue' hasBackground={false}>
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
        <div>
          <Text fontFamily="onest" className={styles.DetailCardDecription}>
            Ребенок учится видеть в изображении структуру, а не просто красивую картинку. Он начинает понимать, из чего состоит визуальная работа и почему одни решения выглядят гармонично, а другие — нет.
          </Text>
          <div className={styles.WrapperColums}>
            <div className={styles.WrapperColumsOne}>
              <img src={photoCur1} alt="#" />
              <div className={styles.WrapperText}>
                <Text size={TextSizes.XL2} fontFamily='onest'>
                  #
                  ЮныйВебДизайнер
                </Text>
                <Text size={TextSizes.XL2} fontFamily='onest'>
                  #
                  ГрафДизайнДетям
                </Text>
              </div>
              <Btn color='orange'>
                Записаться на курс
              </Btn>
            </div>
            <div>
              <img src={photoCur2} alt="#" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Text className={styles.CoursInfoStep}>
          Как проходят занятия
        </Text>
      </div>
    </div>
  );
}
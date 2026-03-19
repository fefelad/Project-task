import { useParams, useNavigate } from 'react-router-dom';

import Text from '../../../../shared/ui/Text/Text';
import Card from '../../../../shared/ui/Card/Card';
import { courseCards, getInfoTexts } from '../../modal';
import Btn from '../../../../shared/ui/Btn/Btn';
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
        />
      </div>
    </div>
  );
}
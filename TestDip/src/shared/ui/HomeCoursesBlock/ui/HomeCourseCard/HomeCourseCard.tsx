import Text from '../../../Text/Text';
import styles from './HomeCourseCard.module.css';

export interface HomeCourseCardProps {
  title: string;
  secondtitle: string;
  description: string;
  className?: string;
}

export default function HomeCourseCard({
  title,
  secondtitle,
  description,
  className,
}: HomeCourseCardProps) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <Text fontFamily="onest" className={styles.cardTitle}>
        {title}
      </Text>

      <Text fontFamily="onest" className={styles.cardSecondTitle}>
        {secondtitle}
      </Text>

      <Text fontFamily="onest" className={styles.cardDescription}>
        {description}
      </Text>
    </div>
  );
}

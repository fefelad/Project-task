import Text, { TextWeight } from '../../../Text/Text';
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
      <div className={styles.cardHeader}>
        <Text
          fontFamily="involve"
          className={styles.cardTitle}
        >
          {title}
        </Text>

        <Text
          fontFamily="onest"
          className={styles.cardSecondTitle}
          weight={TextWeight.MEDIUM}
        >
          {secondtitle}
        </Text>
      </div>

      <Text
        fontFamily="onest"
        className={styles.cardDescription}
        weight={TextWeight.REGULAR}
      >
        {description}
      </Text>
    </div>
  );
}

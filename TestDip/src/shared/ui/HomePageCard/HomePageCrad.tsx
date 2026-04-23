import Text, { TextSizes, TextWeight } from '../Text/Text';
import Info from '../Info/Info';
import styles from './HomePageCard.module.css';
import type { HomePageTeacher } from './modal';
import { tr } from 'zod/v4/locales';

interface HomePageCradProps {
  teacher: HomePageTeacher;
}

export default function HomePageCrad({ teacher }: HomePageCradProps) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <img
          className={styles.image}
          src={teacher.image}
          alt={teacher.name}
        />

        <div className={styles.content}>
          <Text
            className={styles.name}
            fontFamily="involve"
            weight={TextWeight.MEDIUM}
          >
            {teacher.name}
          </Text>

          <div className={styles.tags}>
            {teacher.tags.map((tag, index) => (
              <Text
                key={index}
                className={styles.tag}
                fontFamily="onest"
                size={TextSizes.XL2}
              >
                # {tag}
              </Text>
            ))}
          </div>
        </div>
      </div>

      <Text
        className={styles.description}
        fontFamily="onest"
        weight={TextWeight.REGULAR}
      >
        {teacher.description}
      </Text>

      <div className={styles.infoContainer}>
        <Info hasWhiteBg={false} isTextWhite={false} fullWidth={false}>
          {teacher.ageText}
        </Info>

        <Info hasWhiteBg={true} isTextWhite={true} fullWidth={false}>
          {teacher.startText}
        </Info>
      </div>
    </div>
  );
}
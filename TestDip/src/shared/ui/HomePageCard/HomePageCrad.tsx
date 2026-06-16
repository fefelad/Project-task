import { useNavigate } from 'react-router-dom';
import Text, { TextSizes, TextWeight } from '../Text/Text';
import Btn from '../Btn/Btn';
import styles from './HomePageCard.module.css';
import type { HomePageTeacher } from './modal';
import { getTeacherCourseTags } from '../../lib/teachers/getTeacherCourseTags';

interface HomePageCradProps {
  teacher: HomePageTeacher;
  buttonClassName?: string;
}

export default function HomePageCrad({
  teacher,
  buttonClassName,
}: HomePageCradProps) {
  const navigate = useNavigate();
  const courseTags = getTeacherCourseTags(teacher.id);

  const handleDetailsClick = () => {
    navigate(`/teachers/${teacher.id}`);
  };
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
            className={`${styles.name} ${teacher.shortName ? styles.nameFull : ''}`}
            fontFamily="involve"
            weight={TextWeight.MEDIUM}
          >
            {teacher.name}
          </Text>

          {teacher.shortName && (
            <Text
              className={`${styles.name} ${styles.nameShort}`}
              fontFamily="involve"
              weight={TextWeight.MEDIUM}
            >
              {teacher.shortName}
            </Text>
          )}

          <div className={styles.tags}>
            {courseTags.map((tag) => (
              <Text
                key={tag}
                className={styles.tag}
                fontFamily="onest"
                size={TextSizes.XL2}
              >
                {tag}
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
        <Btn
          color="blue"
          width="100%"
          className={buttonClassName ?? styles.detailsBtn}
          onClick={handleDetailsClick}
        >
          Подробнее
        </Btn>
      </div>
    </div>
  );
}
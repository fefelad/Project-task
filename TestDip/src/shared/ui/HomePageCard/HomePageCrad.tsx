import { useNavigate } from 'react-router-dom';
import Text, { TextSizes, TextWeight } from '../Text/Text';
import Btn from '../Btn/Btn';
import styles from './HomePageCard.module.css';
import type { HomePageTeacher } from './modal';
import { teachers } from '../CardTeacher/modal/teacher';

interface HomePageCradProps {
  teacher: HomePageTeacher;
  buttonClassName?: string;
}

export default function HomePageCrad({
  teacher,
  buttonClassName,
}: HomePageCradProps) {
  const navigate = useNavigate();
  const teacherPageData = teachers.find((item) => item.id === teacher.id);
  const description = teacherPageData?.descriptionDesktop ?? teacher.description;
  const tags = teacherPageData?.tags ?? [];

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
          <div className={styles.header}>
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

            {tags.length > 0 && (
              <Text
                className={styles.tags}
                fontFamily="onest"
                size={TextSizes.XL2}
                weight={TextWeight.REGULAR}
              >
                {tags.join(' · ')}
              </Text>
            )}
          </div>
        </div>
      </div>

      <Text
        className={styles.description}
        fontFamily="onest"
        weight={TextWeight.REGULAR}
      >
        {description}
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
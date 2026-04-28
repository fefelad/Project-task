import PopupInfo from '../../shared/ui/PopupInfo/PopupInfo';
import Text from '../../shared/ui/Text/Text';
import styles from './PageNotFound.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      
      <Text fontFamily="involve" className={styles.code}>
        404
      </Text>

      <Text fontFamily="onest" className={styles.description}>
        Кажется, эта страница решила отдохнуть. Давайте вернемся
        на главную и найдем что-то более увлекательное
      </Text>
      <div className={styles.popup}>
        <PopupInfo color='blue' className={styles.badge}>
            Страница отдыхает
        </PopupInfo>
      </div>

    </div>
  );
}
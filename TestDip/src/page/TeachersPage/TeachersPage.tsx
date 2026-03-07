import CardTeacher from '../../shared/ui/CardTeacher/CardTeacher';
import Text, { TextSizes } from '../../shared/ui/Text/Text';
import styles from './TeachersPage.module.css';

export default function TeachersPage() {
  return (
    <>
      <Text className={styles.TeacherPageTitle}>
        Наши преподаватели 
      </Text>
      <div>
        <CardTeacher/>
      </div>
    </>
  )
}

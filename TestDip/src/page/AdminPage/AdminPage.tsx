import { Link } from 'react-router-dom';
import styles from './AdminPage.module.css';

export default function AdminPage() {
  return (
    <div className={styles.page}>

      <div className={styles.grid}>
        <Link className={styles.card} to="/admin/requests">
          <h2>Заявки</h2>
          <p>Просмотр заявок и статусов оплаты</p>
        </Link>


        <Link className={styles.card} to="/admin/courses">
          <h2>Курсы</h2>
          <p>Скоро добавим управление курсами</p>
        </Link>

        <Link className={styles.card} to="/admin/portfolio">
          <h2>Портфолио</h2>
          <p>Скоро добавим загрузку работ</p>
        </Link>
      </div>
    </div>
  );
}
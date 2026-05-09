import Header from '../shared/ui/Header/Header';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../page/HomePage/HomePage';
import CoursPage from '../page/CoursPage/CoursPage';
import CourseDetailPage from '../page/CoursPage/ui/CourseDetailPage/CourseDetailPage';
import TeachersPage from '../page/TeachersPage/TeachersPage';
import TeacherDetailPage from '../page/TeachersPage/ui/TeacherDetailPage/TeacherDetailPage';
import PortfolioPage from '../page/PortfolioPage/PortfolioPage';
import AboutPage from '../page/AboutPage/AboutPage';
import ContactPage from '../page/ContactPage/ContactPage';
import NotFoundPage from '../page/PageNotFound/PageNotFound';
import styles from './App.module.css';
import { Footer } from '../shared/ui/Footer/Footer';
import AdminLoginPage from '../page/AdminLoginPage/AdminLoginPage';
import AdminPage from '../page/AdminPage/AdminPage';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import AdminRequestsPage from '../page/AdminRequestsPage/AdminRequestsPage';

interface RouteConfig {
  path: string;
  name: string;
  component: React.ComponentType;
  showInHeader?: boolean;
}

const ProtectedAdminPage = () => (
  <ProtectedAdminRoute>
    <AdminPage />
  </ProtectedAdminRoute>
);

const ProtectedAdminRequestsPage = () => (
  <ProtectedAdminRoute>
    <AdminRequestsPage />
  </ProtectedAdminRoute>
);

export const AppRoutes: RouteConfig[] = [
  { path: '/', name: 'Главная', component: HomePage, showInHeader: false },

  { path: '/cours', name: 'Курсы', component: CoursPage, showInHeader: true },
  { path: '/teachers', name: 'Преподаватели', component: TeachersPage, showInHeader: true },
  { path: '/portfolio', name: 'Портфолио', component: PortfolioPage, showInHeader: true },
  { path: '/about', name: 'О школе', component: AboutPage, showInHeader: true },
  { path: '/contact', name: 'Контакты', component: ContactPage, showInHeader: true },

  { path: '/cours/:courseId', name: 'Курс', component: CourseDetailPage },
  { path: '/teachers/:teacherId', name: 'Преподаватель', component: TeacherDetailPage },

  { path: '/admin/login', name: 'Вход в админку', component: AdminLoginPage },
  { path: '/admin', name: 'Админка', component: ProtectedAdminPage },
  { path: '/admin/requests', name: 'Заявки', component: ProtectedAdminRequestsPage },

  { path: '/404', name: '404', component: NotFoundPage },
];

function AppContent() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={styles.container_main}>
      {!isAdminRoute && <Header />}

      <Routes>
        {AppRoutes.map((route) => {
          const Component = route.component;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Component />}
            />
          );
        })}
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/Project-task">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
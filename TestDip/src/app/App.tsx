import Header from '../shared/ui/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../page/HomePage/HomePage';
import CoursPage from '../page/CoursPage/CoursPage';
import CourseDetailPage from '../page/CoursPage/ui/CourseDetailPage/CourseDetailPage';
import TeachersPage from '../page/TeachersPage/TeachersPage';
import TeacherDetailPage from '../page/TeachersPage/ui/TeacherDetailPage/TeacherDetailPage'; 
import PortfolioPage from '../page/PortfolioPage/PortfolioPage';
import AboutPage from '../page/AboutPage/AboutPage';
import ContactPage from '../page/ContactPage/ContactPage';
import NotFoundPage from '../page/PageNotFound/PageNotFound';
import styles from  './App.module.css';
import { Footer } from '../shared/ui/Footer/Footer';

interface RouteConfig  {
  path: string;
  name: string;
  component: React.ComponentType;
};

export const AppRoutes: RouteConfig[] = [
  { path: '/', name: 'Главная', component: HomePage },
  { path: '/cours', name: 'Курсы', component: CoursPage },
  { path: '/cours/:courseId', name: 'Курс', component: CourseDetailPage },
  { path: '/teachers', name: 'Преподаватели', component: TeachersPage },
  { path: '/teachers/:teacherId', name: 'Преподаватель', component: TeacherDetailPage },
  { path: '/portfolio', name: 'Портфолио', component: PortfolioPage },
  { path: '/about', name: 'О школе', component: AboutPage },
  { path: '/contact', name: 'Контакты', component: ContactPage },
  { path: '/404', name: '404', component: NotFoundPage}
];

function App() {
  return (
    <>
      <BrowserRouter>
        <div className={styles.container_main}>
          <Header/>
          <Routes>
            {AppRoutes.map((route) =>(
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />} 
              />
            ))}
          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
import Header from '../shared/ui/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../page/HomePage/HomePage';
import CoursPage from '../page/CoursPage/CoursPage';
import TeachersPage from '../page/TeachersPage/TeachersPage';
import PortfolioPage from '../page/PortfolioPage/PortfolioPage';
import AboutPage from '../page/AboutPage/AboutPage';
import ContactPage from '../page/ContactPage/ContactPage';
import styles from  './App.module.css';

type RouteConfig = {
  path: string;
  name: string;
  component: React.ComponentType;
};

export const AppRoutes: RouteConfig[] = [
  { path: '/', name: 'Главная', component: HomePage },
  { path: '/cours', name: 'Курсы', component: CoursPage },
  { path: '/teachers', name: 'Преподаватели', component: TeachersPage },
  { path: '/portfolio', name: 'Портфолио', component: PortfolioPage },
  { path: '/about', name: 'О школе', component: AboutPage },
  { path: '/contact', name: 'Контакты', component: ContactPage },
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
        </div>
      </BrowserRouter>
    </>
  )
}

export default App

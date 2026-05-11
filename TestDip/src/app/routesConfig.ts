import type { ComponentType } from 'react';

import HomePage from '../page/HomePage/HomePage';
import CoursPage from '../page/CoursPage/CoursPage';
import CourseDetailPage from '../page/CoursPage/ui/CourseDetailPage/CourseDetailPage';
import TeachersPage from '../page/TeachersPage/TeachersPage';
import TeacherDetailPage from '../page/TeachersPage/ui/TeacherDetailPage/TeacherDetailPage';
import PortfolioPage from '../page/PortfolioPage/PortfolioPage';
import AboutPage from '../page/AboutPage/AboutPage';
import ContactPage from '../page/ContactPage/ContactPage';
import NotFoundPage from '../page/PageNotFound/PageNotFound';
import PolisPage from '../page/PolisPage/PolisPage';

export interface RouteConfig {
  path: string;
  name: string;
  component: ComponentType;
  showInHeader?: boolean;
}

export const AppRoutes: RouteConfig[] = [
  { path: '/', name: 'Главная', component: HomePage, showInHeader: false },

  { path: '/cours', name: 'Курсы', component: CoursPage, showInHeader: true },
  { path: '/teachers', name: 'Преподаватели', component: TeachersPage, showInHeader: true },
  { path: '/portfolio', name: 'Портфолио', component: PortfolioPage, showInHeader: true },
  { path: '/about', name: 'О школе', component: AboutPage, showInHeader: true },
  { path: '/contact', name: 'Контакты', component: ContactPage, showInHeader: true },

  { path: '/cours/:courseId', name: 'Курс', component: CourseDetailPage },
  { path: '/teachers/:teacherId', name: 'Преподаватель', component: TeacherDetailPage },
  { path: '/privacy', name: 'Политика', component: PolisPage, showInHeader: false },

  { path: '/404', name: '404', component: NotFoundPage },
];
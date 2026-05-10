import Header from '../shared/ui/Header/Header';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import styles from './App.module.css';
import { Footer } from '../shared/ui/Footer/Footer';
import { AppRoutes } from './routesConfig';
import AdminLoginPage from '../page/AdminLoginPage/AdminLoginPage';
import AdminPage from '../page/AdminPage/AdminPage';
import AdminRequestsPage from '../page/AdminRequestsPage/AdminRequestsPage';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import AdminLayout from './AdminLayout/AdminLayout';
import AdminCoursesPage from '../page/AdminCoursesPage/AdminCoursesPage';
import AdminPortfolioPage from '../page/AdminPortfolioPage/AdminPortfolioPage';
import AdminTeachersPage from '../page/AdminTeachersPage/AdminTeachersPage';

function AppContent() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={isAdminRoute ? styles.container_admin : styles.container_main}>
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

        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="requests" element={<AdminRequestsPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="portfolio" element={<AdminPortfolioPage />} />
          <Route path="teachers" element={<AdminTeachersPage />} />
        </Route>
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
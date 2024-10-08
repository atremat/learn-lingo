import { Routes, Route } from 'react-router-dom';
import 'modern-normalize';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import TeachersPage from './pages/TeachersPage/TeachersPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import Layout from './components/Layout/Layout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { auth } from './config/firebase';
import { useDispatch } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import { fetchTeachers } from './redux/teachers/operations';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(refreshUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </>
  );
}

export default App;

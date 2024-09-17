import { Routes, Route } from 'react-router-dom';
import 'modern-normalize';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import TeachersPage from './pages/TeachersPage/TeachersPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

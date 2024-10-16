import styles from './FavoritesPage.module.css';
import { useSelector } from 'react-redux';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import TeachersList from '../../components/TeachersList/TeachersList';
import { selectFavorites } from '../../redux/favorites/selectors';

const FavoritesPage = () => {
  const favoriteTeachers = useSelector(selectFavorites);

  return (
    <main className={styles.main}>
      <FiltersBar />

      {favoriteTeachers.length > 0 ? (
        <TeachersList teachers={favoriteTeachers} />
      ) : (
        <p>No favorites yet.</p>
      )}
    </main>
  );
};

export default FavoritesPage;

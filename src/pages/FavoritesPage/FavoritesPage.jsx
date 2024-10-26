import styles from './FavoritesPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import TeachersList from '../../components/TeachersList/TeachersList';
import {
  selectFavorites,
  selectFavoritesLoading,
} from '../../redux/favorites/selectors';
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';
import { fetchFavorites } from '../../redux/favorites/operations';

const FavoritesPage = () => {
  const favoriteTeachers = useSelector(selectFavorites);
  const isLoading = useSelector(selectFavoritesLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <FiltersBar />
      {isLoading && <Loader />}

      {favoriteTeachers.length > 0 ? (
        <TeachersList teachers={favoriteTeachers} />
      ) : (
        <p>No favorites yet.</p>
      )}
    </main>
  );
};

export default FavoritesPage;

import styles from './FavoritesPage.module.css';
import { useSelector } from 'react-redux';
import { selectTeachers } from '../../redux/teachers/selectors';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import TeachersList from '../../components/TeachersList/TeachersList';
import { selectFavorites } from '../../redux/favorites/selectors';

const FavoritesPage = () => {
  const teachers = useSelector(selectTeachers);
  const favoriteIndexes = useSelector(selectFavorites);

  const favoriteTeachers = teachers.filter((_, id) =>
    favoriteIndexes.includes(id)
  );

  return (
    <main className={styles.main}>
      <FiltersBar />

      <TeachersList teachers={favoriteTeachers} />
    </main>
  );
};

export default FavoritesPage;

import styles from './FavoritesPage.module.css';
import { useSelector } from 'react-redux';
import {
  selectFavoriteTeachers,
  selectTeachers,
} from '../../redux/teachers/selectors';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import TeachersList from '../../components/TeachersList/TeachersList';

const FavoritesPage = () => {
  const teachers = useSelector(selectTeachers);
  const favoriteIndexes = useSelector(selectFavoriteTeachers);

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

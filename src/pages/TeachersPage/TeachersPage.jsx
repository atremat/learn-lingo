import styles from './TeachersPage.module.css';
// import teachers from '../../data/teachers.json';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import TeachersList from '../../components/TeachersList/TeachersList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTeachers,
  selectTeachersLoading,
} from '../../redux/teachers/selectors';
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';
import { fetchTeachers } from '../../redux/teachers/operations';

const TeachersPage = () => {
  const teachers = useSelector(selectTeachers);
  const isLoading = useSelector(selectTeachersLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <FiltersBar />

      {isLoading ? <Loader /> : <TeachersList teachers={teachers} />}
    </main>
  );
};

export default TeachersPage;

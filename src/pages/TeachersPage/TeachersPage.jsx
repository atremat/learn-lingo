import styles from './TeachersPage.module.css';
// import teachers from '../../data/teachers.json';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import TeachersList from '../../components/TeachersList/TeachersList';
import { useSelector } from 'react-redux';
import { selectTeachers } from '../../redux/teachers/selectors';

const TeachersPage = () => {
  const teachers = useSelector(selectTeachers);

  return (
    <main className={styles.main}>
      <FiltersBar />

      <TeachersList teachers={teachers} />
    </main>
  );
};

export default TeachersPage;

import styles from './TeachersPage.module.css';
// import teachers from '../../data/teachers.json';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import TeachersList from '../../components/TeachersList/TeachersList';

const TeachersPage = () => {
  return (
    <main className={styles.main}>
      <FiltersBar />

      <TeachersList />
    </main>
  );
};

export default TeachersPage;

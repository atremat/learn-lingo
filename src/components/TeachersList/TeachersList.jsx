import TeacherItem from '../TeacherItem/TeacherItem';
import styles from './TeachersList.module.css';

const TeachersList = ({ teachers }) => {
  console.log(teachers);
  return (
    <ul className={styles.list}>
      {teachers.map(teacher => (
        <TeacherItem
          key={`${teacher.name}${teacher.surname}`}
          teacher={teacher}
        />
      ))}
    </ul>
  );
};

export default TeachersList;

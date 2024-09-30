import { useEffect } from 'react';
import { fetchTeachers } from '../../redux/teachers/operations';
import {
  selectTeachers,
  selectTeachersError,
  selectTeachersLoading,
} from '../../redux/teachers/selectors';
import TeacherItem from '../TeacherItem/TeacherItem';
import styles from './TeachersList.module.css';
import { useDispatch, useSelector } from 'react-redux';

const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const loading = useSelector(selectTeachersLoading);
  const error = useSelector(selectTeachersError);
  console.log(teachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <ul className={styles.list}>
          {teachers.map(teacher => (
            <TeacherItem
              key={`${teacher.name}${teacher.surname}`}
              teacher={teacher}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default TeachersList;

import { useEffect, useState } from 'react';
import { fetchTeachers } from '../../redux/teachers/operations';
import {
  selectTeachers,
  selectTeachersError,
  selectTeachersLoading,
} from '../../redux/teachers/selectors';
import TeacherItem from '../TeacherItem/TeacherItem';
import styles from './TeachersList.module.css';
import { useDispatch, useSelector } from 'react-redux';

const PER_PAGE = 3;

const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const loading = useSelector(selectTeachersLoading);
  const error = useSelector(selectTeachersError);

  const [page, setPage] = useState(1);
  const [visibleTeachers, setVisibleTeachers] = useState(
    teachers.slice(0, page * PER_PAGE)
  );

  const isVisible = page * PER_PAGE < teachers.length;
  console.log('visibleTeachers ', visibleTeachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleShowMore = () => {
    setVisibleTeachers(teachers.slice(0, (page + 1) * PER_PAGE));
    setPage(prev => prev + 1);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && visibleTeachers?.length > 0 && (
        <>
          <ul className={styles.list}>
            {visibleTeachers.map(teacher => (
              <TeacherItem
                key={`${teacher.name}${teacher.surname}`}
                teacher={teacher}
              />
            ))}
          </ul>
          {isVisible && (
            <button
              className={styles.moreBtn}
              type="button"
              onClick={handleShowMore}
            >
              Load more
            </button>
          )}
        </>
      )}
    </>
  );
};

export default TeachersList;

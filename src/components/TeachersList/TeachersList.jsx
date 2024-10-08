import { useEffect, useState } from 'react';
import {
  selectTeachersError,
  selectTeachersLoading,
} from '../../redux/teachers/selectors';
import TeacherItem from '../TeacherItem/TeacherItem';
import styles from './TeachersList.module.css';
import { useSelector } from 'react-redux';

const PER_PAGE = 4;

const TeachersList = ({ teachers }) => {
  const loading = useSelector(selectTeachersLoading);
  const error = useSelector(selectTeachersError);

  const [page, setPage] = useState(1);
  const [visibleTeachers, setVisibleTeachers] = useState(
    teachers.slice(0, page * PER_PAGE)
  );

  const isVisible = page * PER_PAGE < teachers.length;

  useEffect(() => {
    setVisibleTeachers(teachers.slice(0, page * PER_PAGE));
  }, [teachers, page]);

  const handleShowMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && visibleTeachers?.length > 0 && (
        <>
          <ul className={styles.list}>
            {visibleTeachers.map((teacher, id) => (
              <TeacherItem
                key={`${teacher.name}${teacher.surname}`}
                teacher={teacher}
                id={id}
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

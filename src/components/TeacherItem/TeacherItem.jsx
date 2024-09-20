import { useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './TeacherItem.module.css';
import book from '/book.svg';

const TeacherItem = ({ teacher }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className={styles.item}>
      <div className={styles.circle}>
        <img
          src={teacher['avatar_url']}
          alt={`${teacher.name} ${teacher.surname}`}
          className={styles.avatar}
        />

        <Icon
          id="online"
          width={12}
          height={12}
          className={styles.onlineIcon}
          fillColor="#38cd3e"
        />
      </div>

      <section className={styles.container}>
        <div className={styles.mainInfoWrapper}>
          <div className={styles.nameWrapper}>
            <p className={styles.languagesText}>Languages</p>
            <h4
              className={styles.name}
            >{`${teacher.name} ${teacher.surname}`}</h4>
          </div>

          <div className={styles.lessonsWrapper}>
            <div className={styles.lessonsInfo}>
              <div className={styles.lessonsOnlineWrapper}>
                <img src={book} alt="Book" className={styles.bookImg} />
                <p className={styles.lessonsText}>Lessons online</p>
              </div>

              <p className={styles.lessonsText}>
                {`Lessons done: ${teacher['lessons_done']}`}
              </p>

              <div className={styles.ratingWrapper}>
                <Icon
                  id="star"
                  width={16}
                  height={16}
                  className={styles.starIcon}
                  fillColor="#ffc531"
                />
                <p className={styles.lessonsText}>{`Rating: 4.8`}</p>
              </div>

              <p
                className={styles.lessonsText}
              >{`Price / 1 hour: ${teacher['price_per_hour']}$`}</p>
            </div>

            <Icon
              id="heart-empty"
              width={26}
              height={26}
              className={styles.heartIcon}
              fillColor="#121417"
            />
          </div>
        </div>

        <div className={styles.teacherInfo}>
          <p className={styles.criterion}>
            Speaks:{' '}
            <span className={styles.criterionLang}>
              {teacher.languages.join(', ')}
            </span>
          </p>

          <p className={styles.criterion}>
            Lesson Info:{' '}
            <span className={styles.criterionText}>
              {teacher['lesson_info']}
            </span>
          </p>

          <p className={styles.criterion}>
            Conditions:{' '}
            <span className={styles.criterionLang}>
              {teacher.conditions.join(' ')}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={toggleReadMore}
          className={styles.readMoreBtn}
        >
          {!isExpanded && 'Read more'}
        </button>

        {isExpanded && (
          <div className="more-info">{/* <p>{teacher.fullInfo}</p> */}</div>
        )}

        <ul className={styles.levelsList}>
          {teacher.levels.map((level, id) => (
            <li key={id} className={styles.levelsItem}>
              #{level}
            </li>
          ))}
        </ul>
      </section>
    </li>
  );
};

export default TeacherItem;

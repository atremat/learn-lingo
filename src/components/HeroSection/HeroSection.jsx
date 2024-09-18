import { NavLink } from 'react-router-dom';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>
        Unlock your potential with the best{' '}
        <span className={styles.highlighted}> language</span> tutors
      </h1>

      <p className={styles.text}>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>

      <NavLink to="/teachers" className={styles.link}>
        Get started
      </NavLink>
    </section>
  );
};

export default HeroSection;

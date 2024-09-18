import styles from './FeaturesSection.module.css';

const FeaturesSection = () => {
  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <p className={styles.quantity}>32,000 +</p>
          <p className={styles.text}>Experienced tutors</p>
        </li>

        <li className={styles.item}>
          <p className={styles.quantity}>300,000 +</p>
          <p className={styles.text}>5-star tutor reviews</p>
        </li>

        <li className={styles.item}>
          <p className={styles.quantity}>120 +</p>
          <p className={styles.text}>Subjects taught</p>
        </li>

        <li className={styles.item}>
          <p className={styles.quantity}>200 +</p>
          <p className={styles.text}>Tutor nationalities</p>
        </li>
      </ul>
    </section>
  );
};

export default FeaturesSection;

import styles from './HomePage.module.css';
import HeroSection from '../../components/HeroSection/HeroSection';
import hero from '/hero.png';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <HeroSection></HeroSection>
      <img src={hero} alt="Happy user photo with laptop" />
    </main>
  );
};

export default HomePage;

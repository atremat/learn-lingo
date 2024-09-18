import styles from './HomePage.module.css';
import HeroSection from '../../components/HeroSection/HeroSection';
import hero from '/hero.png';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.heroWrapper}>
        <HeroSection></HeroSection>
        <img src={hero} alt="Happy user photo with laptop" />
      </div>

      <FeaturesSection />
    </main>
  );
};

export default HomePage;

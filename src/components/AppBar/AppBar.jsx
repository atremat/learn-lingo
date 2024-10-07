import styles from './AppBar.module.css';
import flag from '/flag.svg';
import { NavLink } from 'react-router-dom';
import { AuthNav } from '../AuthNav/AuthNav';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={styles.header}>
      <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <img src={flag} alt="Flag of Ukraine" className={styles.logo} />
          <span className={styles.logoName}>LearnLingo</span>
        </div>

        <nav className={styles.nav}>
          <NavLink to="/" className={styles.link}>
            Home
          </NavLink>
          <NavLink to="/teachers" className={styles.link}>
            Teachers
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/favorites" className={styles.link}>
              Favorites
            </NavLink>
          )}
        </nav>
      </div>

      <AuthNav />
    </header>
  );
};

export default AppBar;

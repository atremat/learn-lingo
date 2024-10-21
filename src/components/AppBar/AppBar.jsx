import styles from './AppBar.module.css';
import flag from '/flag.svg';
import { Link, NavLink } from 'react-router-dom';
import { AuthNav } from '../AuthNav/AuthNav';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import clsx from 'clsx';
import MobileMenu from '../MobileMenu/MobileMenu';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const buildLinkClass = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.active);
  };

  return (
    <header className={styles.header}>
      <div className={styles.mainWrapper}>
        <div className={styles.mainContainer}>
          <Link to="/" className={styles.logoContainer}>
            <img src={flag} alt="Flag of Ukraine" className={styles.logo} />
            <span className={styles.logoName}>LearnLingo</span>
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/" className={buildLinkClass}>
              Home
            </NavLink>
            <NavLink to="/teachers" className={buildLinkClass}>
              Teachers
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/favorites" className={buildLinkClass}>
                Favorites
              </NavLink>
            )}
          </nav>
        </div>

        <AuthNav />
      </div>
      <MobileMenu />
    </header>
  );
};

export default AppBar;

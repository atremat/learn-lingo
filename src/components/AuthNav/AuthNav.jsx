import Icon from '../Icon/Icon';
import styles from './AuthNav.module.css';
import logoutIcon from '/logout.svg';

export const AuthNav = () => {
  return (
    <div className={styles.container}>
      <button type="button" onClick={() => {}} className={styles.loginButton}>
        {/* <Icon
          id="logout"
          width={20}
          height={20}
          className={styles.icon}
          fillColor="#f4c550"
        /> */}
        <img src={logoutIcon} alt="Logout icon" className={styles.logoutIcon} />
        <span className={styles.loginText}>Log in</span>
      </button>

      <button
        type="button"
        onClick={() => {}}
        className={styles.registerButton}
      >
        Registration
      </button>
    </div>
  );
};

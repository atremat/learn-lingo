import { useEffect } from 'react';
import styles from './MobileNav.module.css';
import Modal from 'react-modal';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { NavLink } from 'react-router-dom';

const MobileNav = ({ isOpen, closeModal }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    document.body.classList.add(styles.modalOpen);

    return () => {
      document.body.classList.remove(styles.modalOpen);
    };
  }, []);

  const buildLinkClass = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.active);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        contentLabel="Mobile Menu"
      >
        <button className={styles.closeBtn} onClick={closeModal}>
          <Icon id="close" width="32" height="32" />
        </button>

        <nav className={styles.burgerNav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink to="/" className={buildLinkClass} onClick={closeModal}>
                Home
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to="/teachers"
                className={buildLinkClass}
                onClick={closeModal}
              >
                Teachers
              </NavLink>
            </li>
            {isLoggedIn && (
              <li className={styles.item}>
                <NavLink
                  to="/favorites"
                  className={buildLinkClass}
                  onClick={closeModal}
                >
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </Modal>
    </>
  );
};

export default MobileNav;

import { useEffect, useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './MobileMenu.module.css';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const buildLinkClass = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.active);
  };

  useEffect(() => {
    document.body.classList.add(styles.modalOpen);

    return () => {
      document.body.classList.remove(styles.modalOpen);
    };
  }, []);

  return (
    <div className={styles.mobileWrapper}>
      <button type="button" onClick={openModal} className={styles.burgerBtn}>
        <Icon
          id="burger"
          width="32"
          height="32"
          className={styles.icon}
          fillColor="#121417"
        />
      </button>

      {isOpen && (
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
      )}
    </div>
  );
};

export default MobileMenu;

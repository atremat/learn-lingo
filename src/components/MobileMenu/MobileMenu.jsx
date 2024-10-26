import { useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './MobileMenu.module.css';
import { AuthNav } from '../AuthNav/AuthNav';
import MobileNav from '../MobileNav/MobileNav';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className={styles.mobileWrapper}>
      <div className={styles.wrapper}>
        <button type="button" onClick={openModal} className={styles.burgerBtn}>
          <Icon
            id="burger"
            width="32"
            height="32"
            className={styles.icon}
            fillColor="#121417"
          />
        </button>

        <AuthNav />
      </div>

      {isOpen && <MobileNav isOpen={isOpen} closeModal={closeModal} />}
    </div>
  );
};

export default MobileMenu;

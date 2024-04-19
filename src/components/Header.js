import React from 'react';
import styles from '../styles/header.module.css';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const handleClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    window.history.pushState(null, null, href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
	return (
		<div className={styles.header}>
      <h1 className={styles.logo}>Shenk Properties</h1>
      <h5>Rental homes in Rockford, Illinois</h5>
      <h6>Contact: <a href="mailto:shenkrentals@gmail.com?subject=website_referral">shenkrentals@gmail.com</a></h6>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.target}>
            <button
              className={[styles.button, location.pathname === '/properties' ? styles.selected : ' '].join(' ')}
              href="/properties"
              onClick={handleClick}
            >Properties</button>
          </li>
          <li className={styles.target} >
            <button
              className={[styles.button, location.pathname === '/application' ? styles.selected : ' '].join(' ')}
              href="/application"
              onClick={handleClick}
            >Application</button>
          </li>
        </ul>
      </nav>
    </div>
	);
};

export default Header;

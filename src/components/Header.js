import React from 'react';
import styles from '../styles/header.module.css';

const Header = () => {
  const handleClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    window.history.pushState(null, null, href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
	return (
		<div className={styles.header}>
      <h1>Shenk Properties</h1>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.target}>
            <button className={styles.button} href="/properties" onClick={handleClick}>Properties</button>
          </li>
          <li className={styles.target} >
            <button className={styles.button}  href="/application" onClick={handleClick}>Application</button>
          </li>
        </ul>
      </nav>
    </div>
	);
};

export default Header;

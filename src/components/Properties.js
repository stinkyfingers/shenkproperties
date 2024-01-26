import React from 'react';
import { properties } from '../data';
import styles from '../styles/properties.module.css';

const Properties = () => {
  const handleClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    window.history.pushState(null, null, href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
	return (
		<div>
      <h2>Properties</h2>
      <ul className={styles.list}>
        {properties.map((property, index) => {
          return (
            <li key={index}>
              <button href={`/property/${property.key}`} onClick={handleClick}>{property.name}</button>
            </li>
          );
        })}
      </ul>
    </div>
	);
};

export default Properties;

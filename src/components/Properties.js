import React from 'react';
import styles from '../styles/properties.module.css';
import { getImages, getData } from '../api';

const background = {
  backgroundImage: "url(/Rockford.jpg)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "100vh",
}


const Properties = () => {
  const [properties, setProperties] = React.useState([]);
  const [propertyImages, setPropertyImages] = React.useState([]);
  React.useEffect(() => {
    getData().then(setProperties).catch(console.error);
  },[getData]);
  React.useEffect(() => {
    getImages('').then((imagePaths) => {
      setPropertyImages(() => {
        const dict = {};
        imagePaths?.keys?.forEach((path) => {
          properties.forEach((property) => {
            if (path.includes(property.mainImage)) {
              dict[property.key] = path;
            }
          });
        })
        return dict;
      });
    });
  }, [properties]);
  const handleClick = (key) => {
    window.history.pushState(null, null, `/property/${key}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  const calculateAvailable = (property) => {
    if (!property.available) return '-';
    const date = new Date(property.available);
    if (date && date > Date.now()) return date.toLocaleDateString()
    return 'Yes';
  };
	return (
		<div style={background}>
      <h2 className={styles.header}>Properties</h2>
      <ul className={styles.list}>
        {properties.map((property, index) => {
          return (
            <li
              key={index}
              className={styles.propertyTile}
              onClick={() => handleClick(property.key)}
            >
              <img src={propertyImages[property.key]} alt={property.address} className={styles.propertyTileImage} />
              <h3 className={styles.propertyAddress}>{property.address}</h3>
              <h6>Available: {calculateAvailable(property)}</h6>
            </li>
          );
        })}
      </ul>
    </div>
	);
};

export default Properties;

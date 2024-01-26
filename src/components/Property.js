import React from 'react';
import ImageGallery from 'react-image-gallery';
import { properties } from '../data';
import { useParams } from 'react-router-dom';
import * as api from '../api';

import styles from '../styles/property.module.css';

const Property = () => {
	const [property, setProperty] = React.useState(null);
	const { key } = useParams();
	React.useEffect(() => {
		setProperty(properties.find((property) => property.key === key));
	}, [key]);
	const [images, setImages] = React.useState([]);
	React.useEffect(() => {
		api.getImages(key).then((resp) => {
			setImages(resp?.keys?.map((image) => ({
				original: image,
				originalHeight: 500,
				originalWidth: 800,
				thumbnail: image,
				thumbnailHeight: 100,
				thumbnailWidth: 100,
				originalTitle: image,
			})))
		});
	}, [key]);
	if (!property) {
		return null;
	}
	return (
		<div>
			{ key && (
				<div>
					<h2 className={styles.propertyHeader}>{property.name}</h2>
					<ImageGallery
						items={images}
						// showThumbnails={false}
					/>
				</div>
			)}
		</div>
	);
};

export default Property;

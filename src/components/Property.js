import React from 'react';
import ImageGallery from 'react-image-gallery';
import { properties } from '../data';
import { useParams } from 'react-router-dom';
import * as api from '../api';

import styles from '../styles/property.module.css';

const displayFields = {
	'address': 'Address',
	'bedrooms': 'Bedrooms',
	'bathrooms': 'Bathrooms',
	'rent': 'Rent',
	'deposit': 'Deposit',
	'includedUtilities': 'Included Utilities',
	'excludedUtilities': 'Excluded Utilities',
	'pets': 'Pets',
	'parking': 'Parking',
	'garage': 'Garage',
	'laundry': 'Laundry',
	'lease': 'Lease',
};

const Property = () => {
	const [property, setProperty] = React.useState(null);
	const { key } = useParams();
	React.useEffect(() => {
		setProperty(properties.find((property) => property.key === key));
	}, [key]);
	const [images, setImages] = React.useState([]);
	React.useEffect(() => {
		if (!property) return;
		api.getImages(key).then((resp) => {
			if (!resp?.keys) return;
			setImages(resp.keys
				.sort((a, b) => {
					const mainImage = property?.mainImage;
					if (a.includes(mainImage)) return -1;
					if (b.includes(mainImage)) return 1;
				})
				.map((image) => ({
				original: image,
				originalHeight: 500,
				originalWidth: 800,
				thumbnail: image,
				thumbnailHeight: 100,
				thumbnailWidth: 100,
				originalTitle: image,
			})))
		});
	}, [key, property]);
	if (!property) {
		return null;
	}
	return (
		<div>
			{ key && (
				<div>
					<h2 className={styles.propertyHeader}>{property.name}</h2>
					<div>
						<div>
							<ImageGallery
								items={images}
							/>
						</div>
						<div>
							<h6>Apply to rent:</h6>
							<a href={`/application/${property.address}`}>Apply</a>
						</div>
						<div>
							<table className={styles.propertyAttributesList}>
								<tbody>
								{Object.keys(displayFields).map((key) => {
	
									const value = typeof(property[key]) === 'object' ? property[key].join(', ') : property[key]
									return (
										<tr key={key}>
											<td className={styles.key}>{displayFields[key]}</td>
											<td>{value}</td>
										</tr>
									)
								})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Property;

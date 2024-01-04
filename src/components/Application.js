import React from 'react';
import { Preview, print } from 'react-html2pdf';
import styles from '../styles/application.module.css';
/*
firstName 
lastName
streetAddress
apt
city
state
zip
phoneNumber
email
grossMonthlyIncome
previousLandlord
- name
- phone
- email
- address
- reasonForLeaving
- rentPaid
- dates
- ok to contact
employer
- name
- phone
- email
- dates of employment
notes
 */

const Test = () => {
	const [data, setData] = React.useState({});
	const handleChange = (e) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	console.log(data)
	return (
		<div>
			<Preview id={'jsx-template'} >
				<div className={styles.personalInfo}>
					<div className={styles.inputContainer}>
						<label className={styles.label} htmlFor='firstName'>First Name</label>
						<input className={styles.input} type='text' name='firstName' id='firstName' onChange={handleChange} value={data.firstName || ''}/>
					</div>
					<div className={styles.inputContainer}>
						<label className={styles.label} htmlFor='lastName'>Last Name</label>
						<input className={styles.input} type='text' name='lastName' id='lastName' onChange={handleChange} value={data.lastName || ''} />
					</div>
				</div>
			</Preview>
			<button onClick={()=>print('a', 'jsx-template')}>Print</button>
		</div>
	);
};

export default Test;

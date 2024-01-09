import React from 'react';
import { useReactToPrint } from 'react-to-print';
import styles from '../styles/application.module.css';
import { sendEmail } from '../api';

const Test = () => {
	const [data, setData] = React.useState({});
	const ref = React.useRef(null);
	const handleChange = (e) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handlePrint = useReactToPrint({
		content: () => ref.current,
	});
	const handleEmail = (e) => {
		sendEmail(data)
			.then((res) => {
				// TODO warn user if email failed
				console.log('r', res);
			})
			.catch((err) => {
				console.warn(err);
			});
	}

	return (
		<div>
			<div ref={ref}>
				<table className={styles.personalInfo}>
					<tbody>
						<tr className={styles.inputContainer}>
							<td className={styles.label} htmlFor='firstName'>First Name</td>
							<td className={styles.value}>
								<input className={styles.input} type='text' name='firstName' id='firstName' onChange={handleChange} value={data.firstName || ''}/>
							</td>
						</tr>
						<tr className={styles.inputContainer}>
							<td className={styles.label} htmlFor='lastName'>Last Name</td>
							<td className={styles.value}>
								<input className={styles.input} type='text' name='lastName' id='lastName' onChange={handleChange} value={data.lastName || ''} />
							</td>
						</tr>
						<tr className={styles.inputContainer}>
							<td className={styles.label} htmlFor='streetAddress'>Street Address</td>
							<td className={styles.value} >
								<input className={styles.input} type='text' name='streetAddress' id='streetAddress' onChange={handleChange} value={data.streetAddress || ''} />
							</td>
						</tr>
						<tr className={styles.inputContainer}>
							<td className={styles.label} htmlFor='apt'>Apt</td>
							<td className={styles.value}>
								<input className={styles.input} type='text' name='apt' id='apt' onChange={handleChange} value={data.apt || ''} />
							</td>
						</tr>
						<tr className={styles.inputContainer}>
							<td className={styles.label} htmlFor='city'>City</td>
							<td className={styles.value}>
								<input className={styles.input} type='text' name='city' id='city' onChange={handleChange} value={data.city || ''} />
							</td>
						</tr>
						<tr className={styles.inputContainer}>
							<td className={styles.label} htmlFor='state'>State</td>
							<td className={styles.value}>
								<input className={styles.input} type='text' name='state' id='state' onChange={handleChange} value={data.state || ''} />
							</td>
						</tr>
						<tr className={styles.inputContainer}>
							<td className={styles.label} htmlFor='zip'>Zip</td>
							<td className={styles.value}>
								<input className={styles.input} type='text' name='zip' id='zip' onChange={handleChange} value={data.zip || ''} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<button onClick={handlePrint}>Print</button>
			<button onClick={handleEmail}>Email</button>
		</div>
	);
};

export default Test;

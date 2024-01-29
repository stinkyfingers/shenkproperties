import React from 'react';
import { useReactToPrint } from 'react-to-print';
import styles from '../styles/application.module.css';
import { sendEmail } from '../api';
import { useParams } from 'react-router-dom';

const checkInputType = (type) => {
	const input = document.createElement("input");
	input.setAttribute("type", type);
	return input.type == type
}

const propertyFields = [
	{
		label: 'Location',
		name: 'location',
		type: 'text',
	}
];

const personalFields = [
	{
		label: 'First Name',
		name: 'firstName',
		type: 'text',
	},
	{
		label: 'Last Name',
		name: 'lastName',
		type: 'text',
	},
	{
		label: 'Street Address',
		name: 'streetAddress',
		type: 'text',
	},
	{
		label: 'Apt',
		name: 'apt',
		type: 'text',
	},
	{
		label: 'City',
		name: 'city',
		type: 'text',
	},
	{
		label: 'State',
		name: 'state',
		type: 'text',
	},
	{
		label: 'Zip',
		name: 'zip',
		type: 'text',
	},
	{
		label: 'Phone Number',
		name: 'phoneNumber',
		type: 'text',
	},
	{
		label: 'Email',
		name: 'email',
		type: 'text',
	},
	{
		label: 'Gross Monthly Income',
		name: 'grossMonthlyIncome',
		type: 'number',
	}
];

const landlordFields = [
	{
		label: 'Landlord Name',
		name: 'landlordName',
		type: 'text',
	},
	{
		label: 'Phone Number',
		name: 'phoneNumber',
		type: 'text',
	},
	{
		label: 'Email',
		name: 'email',
		type: 'text',
	},
	{
		label: 'Rental Address',
		name: 'rentalAddress',
		type: 'text',
	},
	{
		label: 'Reason for Leaving',
		name: 'reasonForLeaving',
		type: 'text',
	},
	{
		label: 'Monthly Rent',
		name: 'monthlyRent',
		type: 'number',
	},
	{
		label: 'Occupancy Start',
		name: 'occupancyStart',
		type: checkInputType('month') ? 'month' : 'date',
	},
	{
		label: 'Occupancy End',
		name: 'occupancyEnd',
		type: checkInputType('month') ? 'month' : 'date',
	},
	{
		label: 'Ok to Contact?',
		name: 'okToContact',
		type: 'checkbox',
	}
];

const employmentFields = [
	{
		label: 'Name',
		name: 'name',
		type: 'text',
	},
	{
		label: 'Address',
		name: 'address',
		type: 'text',
	},
	{
		label: 'Phone Number',
		name: 'phoneNumber',
		type: 'text',
	},
	{
		label: 'Email',
		name: 'email',
		type: 'text',
	},
	{
		label: 'Position',
		name: 'position',
		type: 'text',
	},
	{
		label: 'Supervisor Name',
		name: 'supervisorName',
		type: 'text',
	},
	{
		label: 'Start Date',
		name: 'startDate',
		type: checkInputType('month') ? 'month' : 'date',
	},
	{
		label: 'End Date',
		name: 'endDate',
		type: checkInputType('month') ? 'month' : 'date',
	}
];

const Test = () => {
	const { location } = useParams();
	const [data, setData] = React.useState({ location });
	const [status, setStatus] = React.useState({});
	const ref = React.useRef(null);

	const handleChange = (e, section, index) => {
		setStatus(null);
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		setData((prev) => {
			if (section && index > -1) {
				const newSection = window.structuredClone(prev);
				if (!newSection[section]) newSection[section] = [];
				if (!newSection[section][index]) newSection[section][index] = {};
				newSection[section][index][e.target.name] = value;
				return newSection
			}
			if (section) {
				const newSection = window.structuredClone(prev);
				if (!newSection[section]) newSection[section] = {};
				newSection[section][e.target.name] = value;
				return newSection
			}
			return ({...prev, [e.target.name]: value});
		});
	};

	const handlePrint = useReactToPrint({
		content: () => ref.current,
	});

	const handleEmail = (e) => {
		setStatus({ type: 'warning', message: 'Sending email...' });
		sendEmail(data)
			.then((res) => {
				if (res.error) {
					setStatus({ type: 'error', message: res.error })
					return;
				}
				setStatus({ type: 'success', message: 'Email sent!' });
			})
			.catch((err) => {
				console.warn(err);
				setStatus({ type: 'error', message: 'Failed to send email' })
			});
	};
	
	const renderFields = (fields, section, index) => {
		return fields.map((field) => {
			const value = () => {
				if (section && data[section] && data[section][index]) return data[section][index][field.name];
				if (section && data[section]) return data[section][field.name];
				return data[field.name];
			}
			return (
				<div className={styles.inputContainer} key={`${field.name}-${section}-}${index}`}>
					<label className={styles.label} htmlFor={field.name}>{field.label}</label>
					<input
						className={styles.input}
						type={field.type}
						name={field.name}
						id={field.name}
						onChange={(e) => handleChange(e, section, index)}
						value={value() || ''}
					/>
				</div>
			)
		});
	};

	const renderLandlordFields = () => {
		const arr = [];
		for (let i = 0; i < 3; i++) {
			arr.push(
				<div className={styles.rentalContainer} key={`landlord-${i}`}>
					<h6>Landlord {i + 1}</h6>
					{renderFields(landlordFields, 'previousLandlord', i)}
				</div>
			)
		}
		return arr;
	};
	
	const renderEmploymentFields = () => {
		return (
			<div className={styles.employmentContainer} key={`employment`}>
				<h6>Employment</h6>
				{renderFields(employmentFields, 'employer')}
			</div>
		)
	};

	return (
		<div>
			{status && (<div>{status?.message}</div>) }
			<div ref={ref}>
				<div className={styles.personalInfo}>
					<h5 className={styles.header}>Property</h5>
					{propertyFields.map((field) => (
						<div className={styles.inputContainer} key={field.name}>
							<label className={styles.label} htmlFor={field.name}>{field.label}</label>
							<input className={styles.input} type={field.type} name={field.name} id={field.name} onChange={handleChange} value={data[field.name] || ''}/>
						</div>
					))}
				</div>
				<div className={styles.personalInfo}>
					<h5 className={styles.header}>Personal Information</h5>
						{personalFields.map((field) => (
							<div className={styles.inputContainer} key={field.name}>
								<label className={styles.label} htmlFor={field.name}>{field.label}</label>
								<input className={styles.input} type={field.type} name={field.name} id={field.name} onChange={handleChange} value={data[field.name] || ''}/>
							</div>
						))}
				</div>
				<div className={styles.rentalHistory}>
					<h5 className={styles.header}>Rental History</h5>
					{renderLandlordFields()}
				</div>
				<div className={styles.employmentHistory}>
					<h5 className={styles.header}>Employment History</h5>
					{renderEmploymentFields()}
				</div>
				<div className={styles.notes}>
					<h5 className={styles.header}>Notes</h5>
					<textarea
						className={styles.notesInput}
						placeholder='Notes'
						name='notes'
						id='notes'
						onChange={handleChange}
						value={data.notes || ''}
						rows={10}
						cols={50}
					/>
				</div>
			</div>
			<div className={styles.controls}>
				<button className={styles.button} onClick={handlePrint}>Print</button>
				<button className={styles.button} onClick={handleEmail}>Email</button>
			</div>
		</div>
	);
};

export default Test;

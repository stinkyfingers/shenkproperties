import React from 'react';
import { useReactToPrint } from 'react-to-print';
import styles from '../styles/application.module.css';
import { sendEmail } from '../api';

const checkInputType = (type) => {
	const input = document.createElement("input");
	input.setAttribute("type", type);
	return input.type == type
}

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
	const [data, setData] = React.useState({});
	const [status, setStatus] = React.useState('');
	const ref = React.useRef(null);

	const handleChange = (e, section, index) => {
		setStatus('');
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		setData((prev) => {
			if (section && index > -1) {
				const newSection = window.structuredClone(prev);
				if (!newSection[section]) newSection[section] = [];
				if (!newSection[section][index]) newSection[section][index] = {};
				newSection[section][index][e.target.name] = value;
				return newSection
			}
			return ({...prev, [e.target.name]: value});
		});
	};

	const handlePrint = useReactToPrint({
		content: () => ref.current,
	});

	const handleEmail = (e) => {
		setStatus('Sending email...');
		sendEmail(data)
			.then((res) => {
				// TODO warn user if email failed
				setStatus('Email sent!');
			})
			.catch((err) => {
				console.warn(err);
				setStatus('Email failed!')
			});
	};
	
	const renderFields = (fields, section, index) => {
		return fields.map((field) => {
			const value = section && data[section] && data[section][index] ? data[section][index][field.name] : data[field.name];
			return (
				<div className={styles.inputContainer} key={`${field.name}-${section}-}${index}`}>
					<label className={styles.label} htmlFor={field.name}>{field.label}</label>
					<input
						className={styles.input}
						type={field.type}
						name={field.name}
						id={field.name}
						onChange={(e) => handleChange(e, section, index)}
						value={value || ''}
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
		const arr = [];
		for (let i = 0; i < 2; i++) {
			arr.push(
				<div className={styles.employmentContainer} key={`employment-${i}`}>
					<h6>Employment {i + 1}</h6>
					{renderFields(employmentFields, 'employer', i)}
				</div>
			)
		}
		return arr;
	};

	return (
		<div>
			<div className={styles.status}>{status}</div>
			<div ref={ref}>
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
				<button onClick={handlePrint}>Print</button>
				<button onClick={handleEmail}>Email</button>
			</div>
		</div>
	);
};

export default Test;

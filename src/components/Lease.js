import React from 'react';
import { endpoint } from '../api';
import { useParams } from 'react-router-dom';

const Lease = () => {
  const { location } = useParams();
  const normalizedLocation = location.replace(/[ ,\.]/g, '');
  if (!endpoint || !location) {
    return <div>loading...</div>;
  };
	return (
		<div>
      <embed
        src={`${endpoint}/file?key=RentalAgreement${normalizedLocation}.pdf`}
        alt="Rental Agreement"
        width="100%"
        height="1600px"
        type="application/pdf"
      />
    </div>
	);
};

export default Lease;

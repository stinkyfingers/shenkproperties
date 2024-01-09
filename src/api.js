const liveEndpoint = 'https://server.john-shenk.com/shenkproperties';
const devEndpoint = 'http://localhost:8087';

const endpoint = process.env.NODE_ENV === 'production' ? liveEndpoint : devEndpoint;

export const sendEmail = async(message) => {
  const res = await fetch(`${endpoint}/sendEmail `, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  return data;
};
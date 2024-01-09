const liveEndpoint = 'https://server.john-shenk.com/shenkpropertiesapi';
const devEndpoint = 'http://localhost:8087';

const endpoint = process.env.NODE_ENV === 'production' ? liveEndpoint : devEndpoint;

export const sendEmail = async(message) => {
  const url = `${endpoint}/sendEmail`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  return data;
};
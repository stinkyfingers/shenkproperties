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
    body: JSON.stringify(message),
  });
  const data = await res.text();
  return data;
};

export const getImages = async(key) => {
  const url = `${endpoint}/images?property=${key}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}
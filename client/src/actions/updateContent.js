import axios from 'axios';

export const updateSite = async (formData) => {
  console.log('is this working?');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post('/api/content', body, config);
    return res.data;
  } catch (err) {
    console.log('Erorrrr');
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => console.log(error));
    }
  }
};

export const someFunction = () => {
  console.log('yahoooo');
};
export const getContent = async () => {
  try {
    const res = await axios.get(`/api/content`);
    console.log(res);
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => console.log(error));
    }
  }
};

import axios from 'axios';

export const createNewContent = async (formData) => {
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

export const getContentById = async (id) => {
  try {
    const res = await axios.get(`/api/content/${id}`);

    return res.data.maintext;
  } catch (err) {
    console.log(err);
  }
};

export const updateContentById = async (id, formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);
  try {
    const res = await axios.put(`/api/content/${id}`, body, config);

    return res.data.maintext;
  } catch (err) {
    console.log(err);
  }
};

export const getContent = async () => {
  try {
    const res = await axios.get(`/api/content`);
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => console.log(error));
    }
  }
};

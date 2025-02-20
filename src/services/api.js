import { getTokenUser } from '@/helpers/getTokenUser';

const _Fetch = ({ token = '' } = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
  const _token = token || getTokenUser();

  const headerJson = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${_token}`,
    'X-Requested-With': 'XMLHttpRequest',
  };

  const request = async (URL, METHOD, DATA = null) => {
    const urlComplete = `${baseURL}${URL}`;
    
    const options = {
      method: METHOD,
      headers: { ...headerJson },
    };

    if (DATA) {
      options.body = JSON.stringify(DATA);
    }

    try {
      const response = await fetch(urlComplete, options);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en la petición');
      return data;
    } catch (error) {
      throw new Error(`Error en la petición: ${error.message}`);
    }
  };

  return {
    get: (url) => request(url, 'GET'),
    post: (url, data) => request(url, 'POST', data),
    delete: (url) => request(url, 'DELETE'),
    put: (url, data) => request(url, 'PUT', data),
  };
};

export default _Fetch;

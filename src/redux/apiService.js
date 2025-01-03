import axios from 'axios';

export const baseUrl = 'https://www.coinbt.in/api/v1';

const apiService = async ({
  endpoint,
  method = 'GET',
  data = null,
  headers = {},
  token,
}) => {
  try {
    const authToken = token 
    const response = await axios({
      url: `${baseUrl}${endpoint}`,
      method: method.toUpperCase(),
      data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())
        ? data
        : null,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken ? authToken : undefined,
        ...headers,
      },
      timeout: 10000, 
    });

    return response.data; 
  } catch (error) {
    console.error(
      `API call error: ${method.toUpperCase()} ${endpoint}`,
      error.response?.data || error.message
    );

    throw {
      message: error.response?.data?.message || error.message || 'Unknown error',
      status: error.response?.status || 500,
      details: error.response?.data || null,
    };
  }
};

export default apiService;

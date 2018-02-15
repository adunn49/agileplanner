import axios from 'axios';

const instance = axios.create({
  baseURL: (process.env.AXIOS_BASEURL || 'http://localhost:3001') + '/api'
});

export default instance;

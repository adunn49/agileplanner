import axios from 'axios';
import dotenv from 'dotenv';

const instance = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_URL
});

export default instance;

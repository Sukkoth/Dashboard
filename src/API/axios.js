import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;

if (!baseURL) {
  alert('LMS SERVER NOT FOUND, CONTACT SYSTEM ADMINS');
  throw new Error('LMS SERVER NOT FOUND, CONTACT SYSTEM ADMINS');
}

export default axios.create({
  baseURL,
});

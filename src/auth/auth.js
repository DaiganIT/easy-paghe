import axios from 'axios';
import './authInterceptor';

const authentication = {
  isAuthenticated: localStorage.getItem('user'),
  login: 
  /**
   * @param {string} email The email address.
   * @param {string} password The password.
   */
  (email, password) => {
    return axios.post('/api/auth/login', { username: email, password: password })
      .then((response) => {
        authentication.isAuthenticated = true;
        localStorage.setItem('user', response.data);
        return response;
      });
  },
	logout: () => {
    return axios.post('/api/auth/logout')
    .then((response) => {
      authentication.isAuthenticated = false;
      localStorage.removeItem('user');
      return response;
    });
  },
};

export default authentication;
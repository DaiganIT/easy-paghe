import axios from 'axios';

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
        return response;
      });
  },
	logout: () => {},
};

export default authentication;
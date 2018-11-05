import axios from 'axios';

axios.interceptors.response.use(
	function(response) {
		return response;
	},
	function(error) {
		if (error.status === 401) {
			localStorage.removeItem('user');
		}
		return Promise.reject(error);
	},
);

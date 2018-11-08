import axios from 'axios';

axios.interceptors.response.use(
	function(response) {
		return response;
	},
	function({ response }) {
		if (response.status === 401) {
			localStorage.removeItem('user');
			window.location.href = '/login';
		}
		return Promise.reject(response);
	},
);

import axios from 'axios';

function getCompanies() {
	return axios.get('/api/companies');
}

function createCompany(company) {
	return axios.post('/api/companies', company);
}

export default {
	getCompanies,
	createCompany
};

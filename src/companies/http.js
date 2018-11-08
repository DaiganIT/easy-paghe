import axios from 'axios';

function getCompanies() {
	return axios.get('/api/companies');
}

function createCompany(company) {
	return axios.post('/api/companies', company);
}

function loadCompany(companyId) {
	return axios.get(`/api/companies/${companyId}`);
}

export default {
	getCompanies,
	createCompany,
	loadCompany,
};

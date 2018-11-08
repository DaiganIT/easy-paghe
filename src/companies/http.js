import axios from 'axios';

function getTokenSource() {
	const CancelToken = axios.CancelToken;
	return CancelToken.source();
}

function getCompanies() {
	const tokenSource = getTokenSource();
	return { promise: axios.get('/api/companies', { cancelToken: tokenSource.token }), tokenSource };
}

function createCompany(company) {
	const tokenSource = getTokenSource();
	return { promise: axios.post('/api/companies', company, { cancelToken: tokenSource.token }), tokenSource };
}

function updateCompany(id, company) {
	const tokenSource = getTokenSource();
	return { promise: axios.put(`/api/companies/${id}`, company, { cancelToken: tokenSource.token }), tokenSource };
}

function loadCompany(companyId) {
	const tokenSource = getTokenSource();
	return { promise: axios.get(`/api/companies/${companyId}`, { cancelToken: tokenSource.token }), tokenSource };
}

export default {
	getCompanies,
	createCompany,
	updateCompany,
	loadCompany,
};

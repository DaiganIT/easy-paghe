import axios from 'axios';
import { getTokenSource, CancellableQueryablePromise } from '../common/PromiseHelpers';

function getCompanies() {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.get('/api/companies', { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

function createCompany(company) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.post('/api/companies', company, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

function updateCompany(id, company) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.put(`/api/companies/${id}`, company, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

function loadCompany(companyId) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.get(`/api/companies/${companyId}`, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

function deleteCompany(companyId) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.delete(`/api/companies/${companyId}`, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

export default {
	getCompanies,
	createCompany,
	updateCompany,
	loadCompany,
	deleteCompany,
};

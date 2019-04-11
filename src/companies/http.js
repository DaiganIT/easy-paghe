import axios from 'axios';
import { getTokenSource, CancellableQueryablePromise } from '../common/PromiseHelpers';

function getCompanies({ search, page, pageLimit }) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.get(`/api/companies?filter=${search}&page=${page+1}&pageLimit=${pageLimit}`, { cancelToken: tokenSource.token }),
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

function updateCompany(companyId, company) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.put(`/api/companies/${companyId}`, company, { cancelToken: tokenSource.token }),
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

function deleteCompany(companyId, employees) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.delete(`/api/companies/${companyId}${employees ? '?employees=true' : ''}`, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

function deleteBase(companyId, baseId, employees) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.delete(`/api/companies/${companyId}/bases/${baseId}${employees ? '?employees=true' : ''}`, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

export default {
	getCompanies,
	createCompany,
	updateCompany,
	loadCompany,
	deleteCompany,
	deleteBase,
};

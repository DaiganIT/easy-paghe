import axios from 'axios';
import { getTokenSource, CancellableQueryablePromise } from '../common/PromiseHelpers';

function getPeople() {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.get('/api/people', { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

function createPerson(person) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.post('/api/people', { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

function updatePerson(id, person) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.put(`/api/people/${id}`, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

function loadPerson(personId) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.get(`/api/people/${personId}`, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

export default {
	getPeople,
	createPerson,
	updatePerson,
	loadPerson,
};

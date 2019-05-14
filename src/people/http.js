import axios from 'axios';
import debounce from 'debounce-promise';
import { getTokenSource, CancellableQueryablePromise } from '../common/PromiseHelpers';

const debouncedGetPeople = debounce(axios.get, 300);

function getPeople({ search, page, pageLimit }) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: debouncedGetPeople(`/api/people?filter=${search}&page=${page+1}&pageLimit=${pageLimit}`, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

function createPerson(person) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.post('/api/people', person, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

function updatePerson(id, person) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.put(`/api/people/${id}`, person, { cancelToken: tokenSource.token }),
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

function deletePerson(personId) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: axios.delete(`/api/people/${personId}`, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

export default {
	getPeople,
	createPerson,
	updatePerson,
	loadPerson,
	deletePerson,
};

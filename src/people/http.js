import axios from 'axios';

function getTokenSource() {
	const CancelToken = axios.CancelToken;
	return CancelToken.source();
}

function getPeople() {
	const tokenSource = getTokenSource();
	return { promise: axios.get('/api/people', { cancelToken: tokenSource.token }), tokenSource };
}

function createPerson(person) {
	const tokenSource = getTokenSource();
	return { promise: axios.post('/api/people', person, { cancelToken: tokenSource.token }), tokenSource };
}

function updatePerson(id, person) {
	const tokenSource = getTokenSource();
	return { promise: axios.put(`/api/people/${id}`, person, { cancelToken: tokenSource.token }), tokenSource };
}

function loadPerson(personId) {
	const tokenSource = getTokenSource();
	return { promise: axios.get(`/api/people/${personId}`, { cancelToken: tokenSource.token }), tokenSource };
}

export default {
	getPeople,
	createPerson,
	updatePerson,
	loadPerson,
};

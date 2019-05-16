import axios from 'axios';
import debounce from 'debounce-promise';
import { getTokenSource, CancellableQueryablePromise } from '../common/PromiseHelpers';

const debouncedGetHired = debounce(axios.get, 300);

function getHiredPeople({ search, page, pageLimit }) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: debouncedGetHired(`/api/hired?filter=${search}&page=${page+1}&pageLimit=${pageLimit}`, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

export default {
	getHiredPeople
};

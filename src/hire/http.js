import axios from 'axios';
import debounce from 'debounce-promise';
import { getTokenSource, CancellableQueryablePromise } from '../common/PromiseHelpers';

const debouncedGet = debounce(axios.get, 300);

function getHiredPeople({ search, page, pageLimit }) {
	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: debouncedGet(`/api/hired?filter=${search}&page=${page+1}&pageLimit=${pageLimit}`, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

function getCcnls({ search, page, pageLimit, withSalaries }) {
	withSalaries = !!withSalaries;

	const tokenSource = getTokenSource();
	return CancellableQueryablePromise({
		promise: debouncedGet(`/api/ccnl?filter=${search}&page=${page+1}&pageLimit=${pageLimit}&withSalaries=${withSalaries}`, { cancelToken: tokenSource.token }),
		tokenSource,
	});
}

export default {
	getHiredPeople,
	getCcnls
};

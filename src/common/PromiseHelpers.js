import axios from 'axios';

export function QueryablePromise({ promise }) {
	let isPending = !promise.isResolved;

	var result = promise.then(
		(v) => {
			isPending = false;
			return v;
		},
		(e) => {
			isPending = false;
			throw e;
		},
	);

	result.isPending = () => isPending;
	return result;
}

function cancelled(err) {
	if (!axios.isCancel(err)) {
		throw err;
	}
}

export function cancellablePromise({ httpCall }) {
	const [promise, tokenSource] = httpCall();
	promise.catch(cancelled);
	return [
		promise,
		function cleanup() {
			if (promise.isPending()) tokenSource.cancel();
		},
	];
}

export function getTokenSource() {
	const CancelToken = axios.CancelToken;
	return CancelToken.source();
}

export function CancellableQueryablePromise({ promise, tokenSource }) {
	return [QueryablePromise(promise), tokenSource];
}

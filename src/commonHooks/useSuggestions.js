import { useState, useEffect } from 'react';
import { cancellablePromise } from '../common/PromiseHelpers';

function useSuggestions({ getPromise, loadOnStart }) {
	const [suggestions, setSuggestions] = useState({ items: [], length: 0 });
	const [isLoading, setIsLoading] = useState(!!loadOnStart);
	const [searchFilter, setSearchFilter] = useState('');
	const [extraParams, setExtraParams] = useState();

	useEffect(
		() => {
			if (isLoading) {
				const callParams = Object.assign({}, { search: searchFilter, page: 0, pageLimit: 15 }, extraParams);
				const [promise, cleanup] = cancellablePromise({ httpCall: () => getPromise(callParams) });
				promise
					.then(({ data }) => {
						setIsLoading(false);
						setSuggestions(data);
					})
					.catch(() => {
						setIsLoading(false);
					});
				return cleanup;
			}
		},
		[isLoading, searchFilter],
	);

	const loadSuggestions = ({ search }) => {
		setSearchFilter(search);
		setIsLoading(true);
	};

	return [isLoading, suggestions, loadSuggestions, setExtraParams]
}

export default useSuggestions;

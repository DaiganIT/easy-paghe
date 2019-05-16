import { useState, useEffect } from 'react';
import { cancellablePromise } from '../common/PromiseHelpers';

function useSuggestions({ getPromise }) {
	const [suggestions, setSuggestions] = useState({ items: [], length: 0 });
	const [isLoading, setIsLoading] = useState(true);
	const [searchFilter, setSearchFilter] = useState('');

	useEffect(
		() => {
			if (isLoading) {
				const [promise, cleanup] = cancellablePromise({ httpCall: () => getPromise({ search: searchFilter, page: 0, pageLimit: 15 }) });
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
		[isLoading],
	);

	const loadSuggestions = ({ search }) => {
		setSearchFilter(search);
		setIsLoading(true);
	};

	const clearSuggestions = () => {
		setSuggestions({ items: [], length: 0 });
	}

	return [isLoading, suggestions, loadSuggestions, clearSuggestions]
}

export default useSuggestions;

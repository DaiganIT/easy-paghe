import { useState, useEffect } from 'react';
import { cancellablePromise } from '../common/PromiseHelpers';

function useSuggestions({ getPromise }) {
	const [suggestions, setSuggestions] = useState({ items: [], length: 0 });
	const [isLoading, setIsLoading] = useState(true);

	useEffect(
		() => {
			if (isLoading) {
				const [promise, cleanup] = cancellablePromise({ httpCall: () => getPromise({ search: '', page: 0, pageLimit: 15 }) });
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

	const loadSuggestions = () => {
		setIsLoading(true);
	};

	const clearSuggestions = () => {
		setSuggestions({ items: [], length: 0 });
	}

	return [isLoading, suggestions, loadSuggestions, clearSuggestions]
}

export default useSuggestions;

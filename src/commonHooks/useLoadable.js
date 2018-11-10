import { useState, useEffect } from 'react';
import { cancellablePromise } from '../common/PromiseHelpers';

function useLoadable({ id, loadPromise, setForm }) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(
		() => {
			if (isLoading) {
				const [promise, cleanup] = cancellablePromise(loadPromise);
				promise
					.then(({ data }) => {
						setIsLoading(false);
						setForm(data);
					})
					.catch(() => {
						setIsLoading(false);
					});
				return cleanup;
			}
		},
		[isLoading],
	);

	useEffect(() => {
		if (id !== 0) setIsLoading(true);
	}, []);

	return [isLoading, setIsLoading];
}

export default useLoadable;

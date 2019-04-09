import { useState, useEffect } from 'react';
import { cancellablePromise } from '../common/PromiseHelpers';
import { replaceWithEmpties } from '../utils';

function useLoadable({ id, loadPromise, setForm }) {
	const [isLoading, setIsLoading] = useState(!!id);

	useEffect(
		() => {
			if (isLoading) {
				const [promise, cleanup] = cancellablePromise({ httpCall: loadPromise });
				promise
					.then(({ data }) => {
						setIsLoading(false);
						setForm(replaceWithEmpties(data));
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

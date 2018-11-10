import { useState, useEffect } from 'react';
import { cancellablePromise } from '../common/PromiseHelpers';

function useDeleteable({ deletePromise, onDelete }) {
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(
		() => {
			if (isDeleting) {
				const [promise, cleanup] = cancellablePromise(deletePromise);
				promise
					.then(() => {
						setIsDeleting(false);
						onDelete && onDelete();
					})
					.catch(() => {
						setIsDeleting(false);
					});
				return cleanup;
			}
		},
		[isDeleting],
	);

	return [isDeleting, setIsDeleting];
}

export default useDeleteable;
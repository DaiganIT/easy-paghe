import { useState, useEffect } from 'react';
import { cancellablePromise } from '../common/PromiseHelpers';

function useDeleteable({ deletePromise, onDelete }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [deleteOptions, setDeleteOptions] = useState();

	useEffect(
		() => {
			if (isDeleting) {
				const [promise, cleanup] = cancellablePromise({ httpCall: () => deletePromise(deleteOptions) });
				promise
					.then(() => {
						setIsDeleting(false);
						onDelete && onDelete(deleteOptions);
						setDeleteOptions(undefined);
					})
					.catch(() => {
						setDeleteOptions(undefined);
						setIsDeleting(false);
					});
				return cleanup;
			}
		},
		[isDeleting],
	);

	const actionDelete = (options) => {
		if(options) {
			setDeleteOptions(options);
		}

		setIsDeleting(true);
	}

	return [isDeleting, actionDelete];
}

export default useDeleteable;
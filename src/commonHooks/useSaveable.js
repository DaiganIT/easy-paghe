import { useState, useEffect } from 'react';
import { cancellablePromise } from '../common/PromiseHelpers';

function useSaveable({ createPromise, updatePromise, id, onSave, onError }) {
	const [isSaving, setIsSaving] = useState(false);

	const save = (savePromise) => {
		const [promise, cleanup] = cancellablePromise({ httpCall: savePromise });
		promise
			.then(response => {
				setIsSaving(false);
				onSave && onSave(response.data);
			})
			.catch(err => {
				setIsSaving(false);
				onError && onError(err);
			});
		return cleanup;
	}

	useEffect(
		() => {
			if (isSaving) {
				if (id === 0) {
					return save(createPromise);
				} else {
					return save(updatePromise);
				}
			}
		},
		[isSaving],
	);

	return [isSaving, setIsSaving];
}

export default useSaveable;

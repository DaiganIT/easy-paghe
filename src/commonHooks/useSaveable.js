import { useState, useEffect } from 'react';
import { cancellablePromise } from '../common/PromiseHelpers';

function useSaveable({ createPromise, updatePromise, id, setId, onSave }) {
	const [isSaving, setIsSaving] = useState(false);

	const create = () => {
		const [promise, cleanup] = cancellablePromise({ httpCall: createPromise });
		promise
			.then((response) => {
				setIsSaving(false);
				setId(response.data.id);
				onSave && onSave(response.data);
			})
			.catch(() => {
				setIsSaving(false);
			});
		return cleanup;
	};

	const update = () => {
		const [promise, cleanup] = cancellablePromise({ httpCall: updatePromise });
		promise
			.then((response) => {
				setIsSaving(false);
				onSave && onSave(response.data);
			})
			.catch(() => {
				setIsSaving(false);
			});
		return cleanup;
	};

	useEffect(
		() => {
			if (isSaving) {
				if (id === 0) {
					return create();
				} else {
					return update();
				}
			}
		},
		[isSaving],
	);

	return [isSaving, setIsSaving];
}

export default useSaveable;

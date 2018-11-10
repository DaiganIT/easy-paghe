import { useState } from 'react';
import http from './http';
import useSaveable from '../commonHooks/useSaveable';
import useLoadable from '../commonHooks/useLoadable';
import useDeleteable from '../commonHooks/useDeleteable';

function usePersonForm({ loadId, defaultName, defaultAddress, defaultPhone, defaultEmail, onSave, onDelete}) {
	const [id, setId] = useState(loadId || 0);
	const [name, setName] = useState(defaultName || '');
	const [address, setAddress] = useState(defaultAddress || '');
	const [phone, setPhone] = useState(defaultPhone || '');
	const [email, setEmail] = useState(defaultEmail || '');

	const createNewPerson = () => http.createPerson({ name, address, phone, email });
	const updatePerson = () => http.updatePerson({ id, name, address, phone, email });
	const loadPerson = () => http.loadPerson(id);
	const deletePerson = () => http.deletePerson(id);
	const setForm = (form) => {
		setId(form.id);
		setName(form.name);
		setAddress(form.address);
		setPhone(form.phone);
		setEmail(form.email);
	};

	const [isSaving, setIsSaving] = useSaveable({
		createPromise: createNewPerson,
		updatePromise: updatePerson,
		id,
		setId,
		onSave,
	});
	const [isLoading] = useLoadable({ id, loadPromise: loadPerson, setForm });
	const [isDeleting, setIsDeleting] = useDeleteable({ deletePromise: deletePerson, onDelete });

	return {
		isLoading,
		isSaving,
		setIsSaving,
		isDeleting,
		setIsDeleting,
		name,
		setName,
		address,
		setAddress,
		phone,
		setPhone,
		email,
		setEmail,
	};
}

export default usePersonForm;

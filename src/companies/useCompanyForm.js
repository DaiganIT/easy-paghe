import { useState } from 'react';
import http from './http';
import useSaveable from '../commonHooks/useSaveable';
import useLoadable from '../commonHooks/useLoadable';
import useDeleteable from '../commonHooks/useDeleteable';

function useCompanyForm({ loadId, defaultName, defaultAddress, defaultPhone, onSave, onDelete}) {
	const [id, setId] = useState(loadId || 0);
	const [name, setName] = useState(defaultName || '');
	const [address, setAddress] = useState(defaultAddress || '');
	const [phone, setPhone] = useState(defaultPhone || '');
	const [employees, setEmployees] = useState([]);

	const createNewCompany = () => http.createCompany({ name, address, phone });
	const updateCompany = () => http.updateCompany({ id, name, address, phone });
	const loadCompany = () => http.loadCompany(id);
	const deleteCompany = () => http.deleteCompany(id);
	const setForm = (form) => {
		setId(form.id);
		setName(form.name);
		setAddress(form.address);
		setPhone(form.phone);
	};

	const [isSaving, setIsSaving] = useSaveable({
		createPromise: createNewCompany,
		updatePromise: updateCompany,
		id,
		setId,
		onSave,
	});
	const [isLoading] = useLoadable({ id, loadPromise: loadCompany, setForm });
	const [isDeleting, setIsDeleting] = useDeleteable({ deletePromise: deleteCompany, onDelete });

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
		employees,
		setEmployees,
	};
}

export default useCompanyForm;

import { useState, useEffect } from 'react';
import http from './http';
import axios from 'axios';

function useCompanyForm({ loadId, defaultName, defaultAddress, defaultPhone }, onSave, onDelete) {
	const [isSaving, setIsSaving] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const [id, setId] = useState(loadId || 0);
	const [name, setName] = useState(defaultName || '');
	const [address, setAddress] = useState(defaultAddress || '');
	const [phone, setPhone] = useState(defaultPhone || '');
	const [employees, setEmployees] = useState([]);

	const setForm = (form) => {
		setId(form.id);
		setName(form.name);
		setAddress(form.address);
		setPhone(form.phone);
	};

	const createNewCompany = ({ name, address, phone }) => {
		const { promise, tokenSource } = http.createCompany({ name, address, phone });
		promise
			.then((response) => {
				setIsSaving(false);
				setId(response.data.id);
				onSave && onSave(response.data);
			})
			.catch((error) => {
				if (!axios.isCancel(error)) {
					setIsSaving(false);
				}
			});

		return function cleanup() {
			if (isSaving) tokenSource.cancel();
		};
	};

	const updateCompany = ({ id, name, address, phone }) => {
		const { promise, tokenSource } = http.updateCompany(id, { name, address, phone });
		promise
			.then((response) => {
				setIsSaving(false);
				onSave && onSave(response.data);
			})
			.catch((error) => {
				if (!axios.isCancel(error)) {
					setIsSaving(false);
				}
			});

		return function cleanup() {
			if (isSaving) tokenSource.cancel();
		};
	};

	useEffect(
		() => {
			if (isSaving) {
				if (id === 0) {
					return createNewCompany({ name, address, phone });
				} else {
					return updateCompany({ id, name, address, phone });
				}
			}
		},
		[isSaving],
	);

	useEffect(
		() => {
			if (isDeleting) {
				const { promise, tokenSource } = http.deleteCompany(id);
				promise
					.then(() => {
						setIsDeleting(false);
						onDelete && onDelete();
					})
					.catch((error) => {
						if (!axios.isCancel(error)) {
							setIsDeleting(false);
						}
					});

				return function cleanup() {
					if (isSaving) tokenSource.cancel();
				};
			}
		},
		[isDeleting],
	);

	useEffect(
		() => {
			if (isLoading) {
				const { promise, tokenSource } = http.loadCompany(id);
				promise
					.then(({ data }) => {
						setIsLoading(false);
						setForm(data);
					})
					.catch((error) => {
						if (!axios.isCancel(error)) {
							setIsLoading(false);
						}
					});

				return function cleanup() {
					if (isLoading) tokenSource.cancel();
				};
			}
		},
		[isLoading],
	);

	useEffect(() => {
		if (id !== 0) setIsLoading(true);
	}, []);

	return [
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
	];
}

export default useCompanyForm;

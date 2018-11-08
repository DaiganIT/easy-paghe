import { useState, useEffect } from 'react';
import http from './http';

function useCompanyForm({ defaultName, defaultAddress, defaultPhone }) {
	const [isSaving, setIsSaving] = useState(false);
	const [name, setName] = useState(defaultName || '');
	const [address, setAddress] = useState(defaultAddress || '');
	const [phone, setPhone] = useState(defaultPhone || '');
	const [employees, setEmployees] = useState([]);

	useEffect(
		() => {
			if (isSaving) {
				http.createCompany({ name, address, phone })
					.then(() => {
						setIsSaving(false);
					})
					.catch(() => {
						setIsSaving(false);
					});
			}
		},
		[isSaving],
	);

	return { name, address, phone, employees, isSaving, setIsSaving, setName, setAddress, setPhone, setEmployees };
}

export default useCompanyForm;

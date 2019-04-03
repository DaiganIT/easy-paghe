import { useState } from 'react';
import update from 'immutability-helper';

import http from './http';
import useSaveable from '../commonHooks/useSaveable';
import useLoadable from '../commonHooks/useLoadable';
import useDeleteable from '../commonHooks/useDeleteable';

const defaultCompany = {
	id: 0,
	name: '',
	fiscalCode: '',
	ivaCode: '',
	inpsRegistrationNumber: '',
	inailRegistrationNumber: '',
	bases: [{
		name: 'Sede principale',
		address: ''
	}]
};

function useCompanyForm({ loadId, onSave, onDelete }) {
	defaultCompany.id = loadId || 0;
	const [company, setCompany] = useState(defaultCompany);
	const [selectedBaseIndex, setSelectedBaseIndex] = useState(0);

	const updateField = (name, value) => {
		setCompany(update(company, {
			[name]: { $set: value }
		}));
	};

	const updateBaseField = (name, index, value) => {
		setCompany(update(company, {
			bases: {
				[index]: {
					[name]: { $set: value }
				}
			}
		}));
	};

	const addBase = () => {
		setCompany(update(company, {
			bases: { $push: [{ name: 'Nuova sede', address: '' }] }
		}));
		setSelectedBaseIndex(company.bases.length);
	}

	const deleteBase = (index) => {
		setCompany(update(company, {
			bases: { $splice: [[index, 1]] }
		}));
		if (selectedBaseIndex === index || selectedBaseIndex === company.bases.length - 1) {
			setSelectedBaseIndex(selectedBaseIndex - 1);
		}
	}

	const setId = (value) => updateField('id', value);

	const createNewCompany = () => http.createCompany(company);
	const updateCompany = () => http.updateCompany(company.id, company);
	const loadCompany = () => http.loadCompany(company.id);
	const deleteCompany = () => http.deleteCompany(company.id);

	const [isSaving, setIsSaving] = useSaveable({ createPromise: createNewCompany, updatePromise: updateCompany, id: company.id, setId, onSave, });
	const [isLoading] = useLoadable({ id: company.id, loadPromise: loadCompany, setId });
	const [isDeleting, setIsDeleting] = useDeleteable({ deletePromise: deleteCompany, onDelete });

	return {
		isLoading,
		isSaving,
		setIsSaving,
		isDeleting,
		setIsDeleting,
		company,
		updateField,
		updateBaseField,
		selectedBaseIndex,
		addBase,
		deleteBase
	};
}

export default useCompanyForm;

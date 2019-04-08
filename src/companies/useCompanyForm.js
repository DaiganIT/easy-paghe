import { useState } from 'react';
import update from 'immutability-helper';

import http from './http';
import useSaveable from '../commonHooks/useSaveable';
import useLoadable from '../commonHooks/useLoadable';
import useDeleteable from '../commonHooks/useDeleteable';
import useValidation from '../commonHooks/useValidation';

import { removeEmpties } from '../utils';
import defaultCompany from './defaultNewCompany';

function useCompanyForm({ loadId, onSave, onDelete }) {
	defaultCompany.id = loadId || 0;
	const [company, setCompany] = useState(defaultCompany);
	const [errors, onError] = useValidation();

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
	}

	const deleteBase = (index) => {
		setCompany(update(company, {
			bases: { $splice: [[index, 1]] }
		}));
	}
	const setId = (value) => updateField('id', value);

	const createNewCompany = () => http.createCompany(removeEmpties(company));
	const updateCompany = () => http.updateCompany(company.id, removeEmpties(company));
	const loadCompany = () => http.loadCompany(company.id);
	const deleteCompany = () => http.deleteCompany(company.id);

	const [isSaving, setIsSaving] = useSaveable({ createPromise: createNewCompany, updatePromise: updateCompany, id: company.id, setId, onSave, onError });
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
		addBase,
		deleteBase,
		errors
	};
}

export default useCompanyForm;

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

function removeEmpties(form) {
	const newForm = Object.assign({}, form);

	for (const key in newForm) {
		if (newForm.hasOwnProperty(key)) {
			if (newForm[key] === '') {
				delete newForm[key];
			} else if (Array.isArray(newForm[key])) {
				for (const arrayElem of newForm[key]) {
					removeEmpties(arrayElem);
				}
			} else if (typeof newForm[key] === 'object') {
				removeEmpties(newForm[key]);
			}
		}
	}

	return newForm;
}

function useCompanyForm({ loadId, onSave, onDelete }) {
	defaultCompany.id = loadId || 0;
	const [company, setCompany] = useState(defaultCompany);
	const [errors, setErrors] = useState({});

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

	const cleanObject = obj => {
		const cleanedErrors = Object.assign({}, obj);
			for (const key in cleanedErrors) {
				const propertyErrorsArray = cleanedErrors[key];

				if (Array.isArray(propertyErrorsArray)) {
					const cleanedErrorsArray = [];
					for (const propertyError of propertyErrorsArray) {
						cleanedErrorsArray.push(propertyError.split(';')[1]);
					}
					cleanedErrors[key] = cleanedErrorsArray;
				} else {
					// nested object validation.
					cleanedErrors[key] = cleanObject(cleanedErrors[key]);
				}
			}
		return cleanedErrors;
	}

	const onError = err => {
		if (err.response && err.response.status && err.response.status === 400) {
			// we have a validation error
			const validationErrors = err.response.data;
			const cleanedErrors = cleanObject(validationErrors);
			console.log(cleanedErrors);
			setErrors(cleanedErrors);
		} else {
			// show a modal dialog common error
		}
	};

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

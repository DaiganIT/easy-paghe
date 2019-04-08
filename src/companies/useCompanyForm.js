import { useState, useEffect } from 'react';
import update from 'immutability-helper';

import http from './http';
import useSaveable from '../commonHooks/useSaveable';
import useLoadable from '../commonHooks/useLoadable';
import useDeleteable from '../commonHooks/useDeleteable';
import useValidation from '../commonHooks/useValidation';
import useSteps, { StepData } from '../commonHooks/useSteps';

import { removeEmpties } from '../utils';
import defaultCompany from './defaultNewCompany';

const stepsConfiguration = [
	new StepData({ label: 'Dettagli azienda' }),
	new StepData({ label: 'Sedi azienda' }),
	new StepData({ label: 'Sommario' })
];

const stepErrorMap = {
	0: ['name', 'fiscalCode', 'ivaCode', 'inpsRegistrationNumber', 'inailRegistrationNumber'],
	1: ['bases']
};

function useCompanyForm({ loadId, onSave, onDelete }) {
	defaultCompany.id = loadId || 0;
	const [company, setCompany] = useState(defaultCompany);
	const [errors, onError] = useValidation();
	const { activeStep, steps, next, prev } = useSteps(stepsConfiguration, 0, stepErrorMap, errors);

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
		errors,
		activeStep, steps, next, prev
	};
}

export default useCompanyForm;

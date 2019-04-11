import { useState } from 'react';
import update from 'immutability-helper';

import http from './http';
import useSaveable from '../commonHooks/useSaveable';
import useLoadable from '../commonHooks/useLoadable';
import useDeleteable from '../commonHooks/useDeleteable';
import useValidation from '../commonHooks/useValidation';
import useSteps from '../commonHooks/useSteps';
import useUpdate from '../commonHooks/useUpdate';

import { removeEmpties } from '../utils';
import defaultCompany from './defaultNewCompany';
import * as stepsUtils from './stepsConfiguration';
import { companyHasEmployees } from './utils';

function useCompanyForm({ loadId, onSave, onDelete, onDeleteBase, baseTab }) {
	defaultCompany.id = loadId || 0;
	const [company, setCompany] = useState(defaultCompany);
	const [errors, onError, validate] = useValidation();

	const onNext = (steps, activeStep) => {
    if (steps[activeStep].validator) {
      let modelToValidate = company;
      if (steps[activeStep].validatorPath) {
        modelToValidate = company[steps[activeStep].validatorPath];
			}
			
			const errors = validate(modelToValidate, steps[activeStep].validator);

			if (errors) {
				return false;
			}
		}
		
		return true;
	}
	
	const { previousStep, activeStep, moveToStep, steps, next, prev, setStepError } = useSteps(stepsUtils.stepsConfiguration, baseTab || 0, onNext);

	useEffect(() => {
    for (const stepErrorIndex in stepsUtils.stepErrorMap) {
      let indexHasErrors = false;
      for (const errorPropertyName of stepsUtils.stepErrorMap[stepErrorIndex]) {
        if (!!errors[errorPropertyName]) {
          indexHasErrors = true;
        }
      }
      if (steps[stepErrorIndex].hasErrors !== indexHasErrors) {
        setStepError(stepErrorIndex, indexHasErrors);
      }
    }
  }, [errors]);

	const [updateField] = useUpdate(company, setCompany);

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

	const deleteBase = ({ baseId, baseIndex }) => {
		setCompany(update(company, {
			bases: { $splice: [[baseIndex, 1]] }
		}));
		onDeleteBase && onDeleteBase({ baseId, baseIndex });
	}

	const onCompanySave = (company) => {
		let index = 0;
		for(const base of company.bases) {
			updateBaseField('id', index, base.id);
			index++;
		}
		onSave && onSave(company);
	}

	const createNewCompany = () => http.createCompany(removeEmpties(company));
	const updateCompany = () => http.updateCompany(company.id, removeEmpties(company));
	const loadCompany = () => http.loadCompany(company.id);
	const deleteCompany = (options) => http.deleteCompany(company.id, options.withEmployees);
	const deleteCompanyBase = (options) => http.deleteBase(company.id, options.baseId, options.withEmployees);

	const [isSaving, setIsSaving] = useSaveable({ createPromise: createNewCompany, updatePromise: updateCompany, id: company.id, onSave: onCompanySave, onError });
	const [isLoading] = useLoadable({ id: company.id, loadPromise: loadCompany, setForm: setCompany });
	const [isDeleting, setIsDeleting] = useDeleteable({ deletePromise: deleteCompany, onDelete });
	const [isDeletingBase, setIsDeletingBase] = useDeleteable({ deletePromise: deleteCompanyBase, onDelete: deleteBase });

	const hasEmployees = () => {
		return companyHasEmployees(company);
	}

	const baseHasEmployees = index => {
		if (!company.bases) return false;
		if (!company.bases[index]) return false;
		if (!company.bases[index].employees) return false;
		return company.bases[index].employees.length > 0;
	}

	return {
		isLoading,
		isSaving,
		setIsSaving,
		isDeleting,
		isDeletingBase,
		setIsDeleting,
		setIsDeletingBase,
		company,
		updateField,
		updateBaseField,
		addBase,
		deleteBase,
		errors,
		hasEmployees,
		baseHasEmployees,
		previousStep, activeStep, steps, next, prev, moveToStep
	};
}

export default useCompanyForm;

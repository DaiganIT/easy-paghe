import { useState } from 'react';
import http from './http';
import useSaveable from '../commonHooks/useSaveable';
import useLoadable from '../commonHooks/useLoadable';
import useDeleteable from '../commonHooks/useDeleteable';
import useValidation from '../commonHooks/useValidation';
import useUpdate from '../commonHooks/useUpdate';
import useSteps, { validateOnNext, useStepErrorEffect } from '../commonHooks/useSteps';
import defaultPerson from './defaultPerson';
import * as stepsUtils from './stepsConfiguration';

function usePersonForm({ loadId, onSave, onDelete, baseTab }) {
	defaultPerson.id = loadId || 0;
	const [person, setPerson] = useState(defaultPerson);
	const [errors, onError, validate] = useValidation();
	const [updateField] = useUpdate(person, setPerson);

	const { previousStep, activeStep, moveToStep, steps, next, prev, setStepError } = useSteps(stepsUtils.stepsConfiguration, baseTab || 0, validateOnNext(validate, person));
	useStepErrorEffect({ errors, setStepError, stepErrorMap: stepsUtils.stepErrorMap, steps });

	const createNewPerson = () => http.createPerson({ name, address, phone, email });
	const updatePerson = () => http.updatePerson({ id, name, address, phone, email });
	const loadPerson = () => http.loadPerson(id);
	const deletePerson = () => http.deletePerson(id);

	const [isSaving, setIsSaving] = useSaveable({ createPromise: createNewPerson, updatePromise: updatePerson, id: person.id, onSave, onError});
	const [isLoading] = useLoadable({ id: person.id, loadPromise: loadPerson, setForm: setPerson });
	const [isDeleting, setIsDeleting] = useDeleteable({ deletePromise: deletePerson, onDelete });

	return {
		isLoading,
		isSaving,
		setIsSaving,
		isDeleting,
		setIsDeleting,
		person,
		updateField,
		errors,
		previousStep, activeStep, moveToStep, steps, next, prev
	};
}

export default usePersonForm;

import { useState } from 'react';
import http from './http';
import useSaveable from '../commonHooks/useSaveable';
import useLoadable from '../commonHooks/useLoadable';
import useValidation from '../commonHooks/useValidation';
import useUpdate from '../commonHooks/useUpdate';
import useSteps, { validateOnNext, useStepErrorEffect } from '../commonHooks/useSteps';
import defaultHirePerson from './defaultHirePerson';
import * as stepsUtils from './stepsConfiguration';
import { removeEmpties } from '../utils';

function useHirePersonForm({ loadId, onSave, baseTab }) {
	defaultHirePerson.id = loadId || 0;
	const [hirePerson, setHirePerson] = useState(defaultHirePerson);
	const [errors, onError, validate] = useValidation();
	const [updateField] = useUpdate(hirePerson, setHirePerson);

	const { previousStep, activeStep, moveToStep, steps, next, prev, setStepError } = useSteps(stepsUtils.stepsConfiguration, baseTab || 0, validateOnNext(validate, hirePerson));
	useStepErrorEffect({ errors, setStepError, stepErrorMap: stepsUtils.stepErrorMap, steps });

	const createNewHirePerson = () => {};//http.createHirePerson(removeEmpties(hirePerson));
	const updateHirePerson = () => {};//http.updateHirePerson(hirePerson.id, removeEmpties(hirePerson));
	const loadHirePerson = () => {};//http.loadHirePerson(hirePerson.id);

	const [isSaving, setIsSaving] = useSaveable({ createPromise: createNewHirePerson, updatePromise: updateHirePerson, id: hirePerson.id, onSave, onError});
	const [isLoading] = useLoadable({ id: hirePerson.id, loadPromise: loadHirePerson, setForm: setHirePerson });

	return {
		isLoading,
		isSaving,
		setIsSaving,
		hirePerson,
		updateField,
		errors,
		previousStep, activeStep, moveToStep, steps, next, prev
	};
}

export default useHirePersonForm;

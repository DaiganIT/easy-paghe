import { useState, useEffect } from 'react';
import validate from 'validate.js';
import update from 'immutability-helper';
import { removeEmpties } from '../utils';

export function StepData({ label, isOptional, isSkipped, hasErrors, isSummary, validator, validatorPath }) {
  return {
    label,
    isOptional,
    isSkipped,
    hasErrors,
    isSummary,
    isCompleted: false,
    validator,
    validatorPath
  }
}

export default function (defaultSteps, beginningStep, stepErrorMap, form, errors, onValidationError) {
  const [steps, setSteps] = useState(defaultSteps);
  const [activeStep, setActiveStep] = useState(beginningStep);
  const [previousStep, setPreviousStep] = useState(0);

  useEffect(() => {
    for (const stepErrorIndex in stepErrorMap) {
      let indexHasErrors = false;
      for (const errorPropertyName of stepErrorMap[stepErrorIndex]) {
        if (!!errors[errorPropertyName]) {
          indexHasErrors = true;
        }
      }
      if (steps[stepErrorIndex].hasErrors !== indexHasErrors) {
        setStepError(stepErrorIndex, indexHasErrors);
      }
    }
  }, [errors]);

  const setCompleted = (stepIndex) => {
    setSteps(update(steps, {
      [stepIndex]: {
        isCompleted: { $set: true }
      }
    }));
  }

  function validateModel() {
    if (steps[activeStep].validator) {
      let modelToValidate = form;
      if (steps[activeStep].validatorPath) {
        modelToValidate = form[steps[activeStep].validatorPath];
      }

      let errors;
      if (Array.isArray(modelToValidate)) {
        let baseErrors;
        let index = 0;
        for(const modelToValidateItem of modelToValidate) {
          baseErrors = validate(removeEmpties(modelToValidateItem), steps[activeStep].validator);
          if(baseErrors) errors = Object.assign({}, errors, { bases: { [index]: baseErrors } });
          index++;
        }
      } else {
        errors = validate(removeEmpties(form), steps[activeStep].validator);
      }

      onValidationError && onValidationError(errors);
      return errors;
    }
  }

  const next = () => {
    // validate model before going forward
    const errors = validateModel();
    if (errors) return;

    setCompleted(activeStep);

    setPreviousStep(activeStep);
    setActiveStep(activeStep + 1);
  }

  const prev = () => {
    setPreviousStep(activeStep);
    setActiveStep(activeStep - 1);
  }

  const moveToStep = (step) => {
    setPreviousStep(activeStep);
    setActiveStep(step);
  }

  const setStepError = (stepIndex, hasErrors) => {
    setSteps(update(steps, {
      [stepIndex]: {
        hasErrors: { $set: hasErrors }
      }
    }));
  }

  return { previousStep, activeStep, steps, next, prev, moveToStep };
}

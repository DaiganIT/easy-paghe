import { useState, useEffect } from 'react';
import update from 'immutability-helper';

export function StepData({ label, isOptional, isSkipped, hasErrors, isSummary, validator, validatorPath, isCompleted }) {
  return {
    label,
    isOptional,
    isSkipped,
    hasErrors,
    isSummary,
    isCompleted: isCompleted,
    validator,
    validatorPath
  }
}

export default function (defaultSteps, beginningStep, onNext) {
  const [steps, setSteps] = useState(defaultSteps);
  const [activeStep, setActiveStep] = useState(beginningStep);
  const [previousStep, setPreviousStep] = useState(beginningStep);

  const setCompleted = (stepIndex) => {
    setSteps(update(steps, {
      [stepIndex]: {
        isCompleted: { $set: true }
      }
    }));
  }

  const setStepError = (stepIndex, hasErrors) => {
    setSteps(update(steps, {
      [stepIndex]: {
        hasErrors: { $set: hasErrors }
      }
    }));
  }

  const next = () => {
    if (activeStep === steps.length-1) return;

    if(onNext && !onNext(steps, activeStep)) return;

    setCompleted(activeStep);

    setPreviousStep(activeStep);
    setActiveStep(activeStep + 1);
  }

  const prev = () => {
    if (activeStep === 0) return;

    setPreviousStep(activeStep);
    setActiveStep(activeStep - 1);
  }

  const moveToStep = (step) => {
    setPreviousStep(activeStep);
    setActiveStep(step);
  }

  return { previousStep, activeStep, steps, next, prev, moveToStep, setStepError };
}

export const validateOnNext = (validate, form) => (steps, activeStep) => {
  if (steps[activeStep].validator) {
    let modelToValidate = form;
    if (steps[activeStep].validatorPath) {
      modelToValidate = form[steps[activeStep].validatorPath];
    }
    const errors = validate(modelToValidate, steps[activeStep].validator);
    if (errors) {
      return false;
    }
  }
  
  return true;
}

export function useStepErrorEffect({ errors, setStepError, stepErrorMap, steps }) {
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
}
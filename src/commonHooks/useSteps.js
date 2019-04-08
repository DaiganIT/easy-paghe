import { useState, useEffect } from 'react';
import update from 'immutability-helper';

export function StepData({label, isOptional, isSkipped, hasErrors}) {
  return {
    label,
    isOptional,
    isSkipped,
    hasErrors,
  }
}

export default function (defaultSteps, beginningStep, stepErrorMap, errors) {
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

  const next = () => {
    setPreviousStep(activeStep);
    setActiveStep(activeStep + 1);
  }

  const prev = () => {
    setPreviousStep(activeStep);
    setActiveStep(activeStep - 1);
  }

  const setStepError = (stepIndex, hasErrors) => {
    setSteps(update(steps, {
      [stepIndex]: {
        hasErrors: { $set: hasErrors }
      }
    }));
  }

  return { previousStep, activeStep, steps, next, prev };
}

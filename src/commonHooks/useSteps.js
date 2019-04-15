import { useState } from 'react';
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

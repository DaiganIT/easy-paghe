import { useState } from 'react';

export function StepData({label, isOptional, isSkipped}) {
  return {
    label,
    isOptional,
    isSkipped
  }
}

export default function (defaultSteps, beginningStep) {
  const [steps] = useState(defaultSteps);
  const [activeStep, setActiveStep] = useState(beginningStep);

  const next = () => {
    setActiveStep(activeStep + 1);
  }

  const prev = () => {
    setActiveStep(activeStep - 1);
  }

  return { activeStep, steps, next, prev };
}

import React from 'react';
import { Stepper, Step, StepLabel, Typography } from '@material-ui/core';

function SimpleStepper({ activeStep, steps }) {
  return <Stepper activeStep={activeStep}>
    {steps.map(step => {
      const props = {};
      const labelProps = {};
      if (step.isOptional) {
        labelProps.optional = <Typography variant="caption">Optional</Typography>;
      }
      if (step.isSkipped) {
        props.completed = false;
      }
      if (step.hasErrors) {
        labelProps.error = true;
      }
      return (
        <Step key={step.label} {...props}>
          <StepLabel {...labelProps}>{step.label}</StepLabel>
        </Step>
      );
    })}
  </Stepper>;
}

export default SimpleStepper;
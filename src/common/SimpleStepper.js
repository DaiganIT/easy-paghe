import React from 'react';
import { Grid, Stepper, Step, StepLabel, Typography, withStyles } from '@material-ui/core';
import StepElement from './StepElement';
import './stepper.css';

const styles = {
  step: {
    marginTop: '1em',
  }
};

function buildLabelProps(step) {
  const props = {
    optional: step.isOptional ? <Typography variant="caption">Optional</Typography> : null,
    error: step.hasErrors
  };

  return props;
}

function SimpleStepper({ classes, previousStep, activeStep, steps, stepMap, next, prev, save, isSaving }) {
  return <React.Fragment>
    <Stepper activeStep={activeStep}>
      {steps.map(step => {
        const labelProps = buildLabelProps(step);
        return (
          <Step key={step.label}>
            <StepLabel {...labelProps}>{step.label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
    <Grid container spacing={24} className={classes.step} justify="center">
      {(() => {
        let jsxArray = [];
        for (const stepElement in stepMap) {
          jsxArray.push(<StepElement key={stepElement} stepElement={stepElement} previousStep={previousStep} activeStep={activeStep} steps={steps}
            stepMap={stepMap} next={next} prev={prev} save={save} isSaving={isSaving} classes={classes} />);
        }
        return <React.Fragment>
          {jsxArray}
        </React.Fragment>;
      })()}
    </Grid>
  </React.Fragment>;
}

export default withStyles(styles)(SimpleStepper);
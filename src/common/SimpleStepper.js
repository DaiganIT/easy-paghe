import React from 'react';
import classnames from 'classnames';
import { Grid, Stepper, Step, StepLabel, Typography, withStyles } from '@material-ui/core';
import StepButtons from './StepButtons';
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

function SimpleStepper({ classes, previousStep, activeStep, steps, stepMap, next, prev, save, isLoading }) {

  const animationName = activeStep >= previousStep ? 'slide-in-right' : 'slide-in-left';

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
    <Grid key={`element.${activeStep}`} container spacing={24} className={classnames(classes.step, animationName)} justify="center">
      <StepElement activeStep={activeStep} stepMap={stepMap} />
    </Grid>
    <Grid key={`pagination.${activeStep}`} container className={classnames(classes.step, animationName)} justify="center">
      <Grid item {...stepMap[activeStep].gridProps}>
        <Grid container spacing={24} className={classes.step} justify="space-between">
          <StepButtons activeStep={activeStep} lastStepNumber={steps.length - 1} next={next} prev={prev} save={save} isLoading={isLoading}></StepButtons>
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment >;
}

export default withStyles(styles)(SimpleStepper);
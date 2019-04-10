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

function buildStepProps(step) {
  const props = {
    completed: step.isCompleted
  };

  return props;
}

function buildLabelProps(step) {
  const props = {
    optional: step.isOptional ? <Typography variant="caption">Optional</Typography> : null,
    error: step.hasErrors
  };

  return props;
}

function SimpleStepper({ classes, previousStep, activeStep, steps, stepMap, next, prev, save, isLoading }) {

  const animationName = activeStep >= previousStep ? 'slide-in-right' : 'slide-in-left';
  const allStepsDone = steps.reduce((agg, item) => agg && (item.isCompleted || item.isSummary), true);

  return <React.Fragment>
    <Stepper id="step-header" activeStep={activeStep}>
      {steps.map(step => {
        const stepProps = buildStepProps(step);
        const labelProps = buildLabelProps(step);
        return (
          <Step key={step.label} {...stepProps} className={`step-header`}>
            <StepLabel {...labelProps}>{step.label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
    <Grid id="step-content" key={`element.${activeStep}`} container spacing={24} className={classnames(classes.step, animationName)} justify="center">
      <StepElement activeStep={activeStep} stepMap={stepMap} />
    </Grid>
    <Grid id="step-footer" key={`pagination.${activeStep}`} container className={classnames(classes.step, animationName)} justify="center">
      <Grid item {...stepMap[activeStep].gridProps}>
        <Grid container spacing={24} className={classes.step} justify="space-between">
          <StepButtons activeStep={activeStep} lastStepNumber={steps.length - 1} allStepsDone={allStepsDone} next={next} prev={prev} save={save} isLoading={isLoading}></StepButtons>
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment >;
}

export default withStyles(styles)(SimpleStepper);
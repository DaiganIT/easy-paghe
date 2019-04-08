import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import StepButtons from './StepButtons';

const styles = {
  step: {
    marginTop: '1em',
  }
};

function StepElement({ classes, stepElement, previousStep, activeStep, stepMap, next, prev, save, isSaving, steps }) {
  const numberStepElement = parseInt(stepElement);
  const style = {
    display: numberStepElement === activeStep ? 'block' : 'none'
  };

  const className = activeStep >= previousStep ? 'slide-in-right' : 'slide-in-left';

  return <Grid item {...stepMap[stepElement].gridProps} style={style} className={className}>
    {stepMap[stepElement].template}
    <Grid container spacing={24} className={classes.step} justify="space-between">
      <StepButtons activeStep={activeStep} lastStepNumber={steps.length - 1} next={next} prev={prev} save={save} isSaving={isSaving}></StepButtons>
    </Grid>
  </Grid>;
}

export default withStyles(styles)(StepElement);
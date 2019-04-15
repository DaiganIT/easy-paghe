import React from 'react';
import { Grid } from '@material-ui/core';

function StepElement({ activeStep, stepMap }) {
  return <Grid item {...stepMap[activeStep].gridProps}>
    {stepMap[activeStep].template}
  </Grid>;
}

export default StepElement;
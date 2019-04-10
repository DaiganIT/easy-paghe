import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import ButtonWithLoader from './ButtonWithLoader';

const styles = {
	saveButton: {
		marginLeft: '1em'
	}
};

function StepButtons({ classes, activeStep, lastStepNumber, prev, next, save, allStepsDone, isLoading }) {
	return (
		<React.Fragment>
			<Grid item>
				<ButtonWithLoader id="button-step-previous" variant="contained" size="small" color="primary" onClick={prev} isLoading={isLoading} disabled={activeStep === 0}>
					Precedente
				</ButtonWithLoader>
			</Grid>
			<Grid item>
				{activeStep < lastStepNumber
					? <ButtonWithLoader id="button-step-next" variant="contained" size="small" color="primary" onClick={next} isLoading={isLoading} disabled={activeStep === lastStepNumber}>
						Prossimo
					</ButtonWithLoader>
					: null}
				{activeStep === lastStepNumber || allStepsDone
					?
					<ButtonWithLoader id="button-step-save" variant="contained" size="small" color="primary" onClick={save} isLoading={isLoading} className={classes.saveButton}>
						Salva
					</ButtonWithLoader>
					: null}
			</Grid>
		</React.Fragment>
	);
}

export default withStyles(styles)(StepButtons);

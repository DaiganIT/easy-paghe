import React from 'react';
import EventBus from 'eventbusjs';
import { Grid, Stepper, Step, StepLabel, Typography, withStyles } from '@material-ui/core';
import CompanyDetails from './CompanyDetails';
import CompanyBases from './CompanyBases';
import CompanySummary from './CompanySummary';
import useCompanyForm from './useCompanyForm';
import Page from '../common/Page';
import StepButtons from '../common/StepButtons';
import buildStepMap from './stepsMap';

const styles = {
	step: {
		marginTop: '1em',
	}
};

function AddCompany({ classes, history }) {
	const onCreate = ({ id }) => {
		history.push(`/index/companies/${id}`);
		EventBus.dispatch('global-notification-show', undefined, { message: 'Azienda creata' });
	};

	const { isSaving, setIsSaving, company, updateField, updateBaseField, addBase, deleteBase, errors, activeStep, steps, next, prev } = useCompanyForm({
		onSave: onCreate,
	});

	const save = () => {
		setIsSaving(true);
	};

	const companyDetails = <CompanyDetails company={company} isSaving={isSaving} updateField={updateField} errors={errors} />;
	const bases = <CompanyBases bases={company.bases} isSaving={isSaving} addBase={addBase} deleteBase={deleteBase} updateBaseField={updateBaseField} errors={errors} />;
	const summary = <CompanySummary company={company} errors={errors} />

	const stepMap = buildStepMap(companyDetails, bases, summary);

	return (
		<Page title="Aggiungi Azienda" noPaper>
			<Stepper activeStep={activeStep}>
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
			</Stepper>
			<Grid container spacing={24} className={classes.step} justify="center">
				<Grid item {...stepMap[activeStep].gridProps}>
					{stepMap[activeStep].template}
					<Grid container spacing={24} className={classes.step} justify="space-between">
						<StepButtons activeStep={activeStep} lastStepNumber={steps.length - 1} next={next} prev={prev} save={save} isLoading={isSaving}></StepButtons>
					</Grid>
				</Grid>
			</Grid>
		</Page >
	);
}

export default withStyles(styles)(AddCompany);

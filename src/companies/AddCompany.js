import React from 'react';
import EventBus from 'eventbusjs';
import CompanyDetails from './CompanyDetails';
import CompanyBases from './CompanyBases';
import CompanySummary from './CompanySummary';
import useCompanyForm from './useCompanyForm';
import Page from '../common/Page';
import buildStepMap from './stepsMap';
import SimpleStepper from '../common/SimpleStepper';



function AddCompany({ classes, history }) {
	const onCreate = ({ id }) => {
		history.push(`/index/companies/${id}`);
		EventBus.dispatch('global-notification-show', undefined, { message: 'Azienda creata' });
	};

	const { isSaving, setIsSaving, company, updateField, updateBaseField, addBase, deleteBase, errors, previousStep, activeStep, steps, next, prev } = useCompanyForm({
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
			<SimpleStepper previousStep={previousStep} activeStep={activeStep} steps={steps} stepMap={stepMap} next={next} prev={prev} save={save} isSaving={isSaving} />
		</Page >
	);
}

export default AddCompany;

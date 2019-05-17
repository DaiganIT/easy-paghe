import React from 'react';
import EventBus from 'eventbusjs';
import HirePersonDetails from './HirePersonDetails';
import useHirePersonForm from './useHirePersonForm';
import useSuggestions from '../commonHooks/useSuggestions';
import Page from '../common/Page';
import buildStepMap from './stepsMap';
//import HirePersonSummary from './HirePersonSummary';
import SimpleStepper from '../common/SimpleStepper';
import companiesHttp from '../companies/http';

function AddHirePerson({ history }) {
	const onCreate = ({ id }) => {
		history.push(`/index/hired/${id}`);
		EventBus.dispatch('global-notification-show', undefined, { message: 'Assunzione creata' });
	};

	const { isSaving, setIsSaving, hirePerson, updateField, previousStep, activeStep, steps, next, prev, moveToStep, errors } = useHirePersonForm({
		onSave: onCreate,
	});
	const [isLoadingCompanySuggestions, companySuggestions, loadCompanySuggestions, clearCompanySuggestions] = useSuggestions({
		getPromise: companiesHttp.getCompanies, loadOnStart: true
	});
	const [isLoadingCompanyBasesSuggestions, companyBasesSuggestions, loadCompanyBasesSuggestions, clearCompanyBasesSuggestions, setCompanyBasesSuggestionsExtraParams] = useSuggestions({
		getPromise: companiesHttp.getCompanyBases
	});

	const save = () => {
		setIsSaving(true);
	};

	const hirePersonDetails = <HirePersonDetails hirePerson={hirePerson} updateField={updateField} isSaving={isSaving} errors={errors}
		companySuggestions={companySuggestions} loadCompanySuggestions={loadCompanySuggestions} clearCompanySuggestions={clearCompanySuggestions}
		companyBasesSuggestions={companyBasesSuggestions} loadCompanyBasesSuggestions={loadCompanyBasesSuggestions} clearCompanyBasesSuggestions={clearCompanyBasesSuggestions} setCompanyBasesSuggestionsExtraParams={setCompanyBasesSuggestionsExtraParams}
		/>
	//const hirePersonSummary = <HirePersonSummary person={person} moveToStep={moveToStep} errors={errors} />

	const stepMap = buildStepMap(hirePersonDetails);//hirePersonSummary);

	return (
		<Page title="Assumi Dipendente" noPaper>
			<SimpleStepper previousStep={previousStep} activeStep={activeStep} steps={steps} stepMap={stepMap} next={next} prev={prev} save={save} isLoading={isSaving} />
		</Page>
	);
}
export default AddHirePerson;

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
import peopleHttp from '../people/http';
import hireHttp from './http';

function AddHirePerson({ history }) {
	const onCreate = ({ id }) => {
		history.push(`/index/hired/${id}`);
		EventBus.dispatch('global-notification-show', undefined, { message: 'Assunzione creata' });
	};

	const { isSaving, setIsSaving, hirePerson, updateField, previousStep, activeStep, steps, next, prev, moveToStep, errors } = useHirePersonForm({
		onSave: onCreate,
	});
	const [isLoadingCompanySuggestions, companySuggestions, loadCompanySuggestions] = useSuggestions({
		getPromise: companiesHttp.getCompanies, loadOnStart: true
	});
	const [isLoadingCompanyBasesSuggestions, companyBasesSuggestions, loadCompanyBasesSuggestions, setCompanyBasesSuggestionsExtraParams] = useSuggestions({
		getPromise: companiesHttp.getCompanyBases
	});
	const [isLoadingPeopleSuggestions, peopleSuggestions, loadPeopleSuggestions] = useSuggestions({
		getPromise: peopleHttp.getPeople, loadOnStart: true
	});
	const [isLoadingCcnlSuggestions, ccnlSuggestions, loadCcnlSuggestions] = useSuggestions({
		getPromise: hireHttp.getCcnls, loadOnStart: true
	});
	const [isLoadingCcnlLevelsSuggestions, ccnlLevelsSuggestions, loadCcnlLevelsSuggestions, setCcnlLevelsSuggestionsExtraParams] = useSuggestions({
		getPromise: hireHttp.getCcnlLevels
	});

	const save = () => {
		setIsSaving(true);
	};

	const hirePersonDetails = <HirePersonDetails hirePerson={hirePerson} updateField={updateField} isSaving={isSaving} errors={errors}
		isLoadingCompanySuggestions={isLoadingCompanySuggestions} companySuggestions={companySuggestions} loadCompanySuggestions={loadCompanySuggestions}
		isLoadingCompanyBasesSuggestions={isLoadingCompanyBasesSuggestions} companyBasesSuggestions={companyBasesSuggestions} loadCompanyBasesSuggestions={loadCompanyBasesSuggestions} setCompanyBasesSuggestionsExtraParams={setCompanyBasesSuggestionsExtraParams}
		isLoadingPeopleSuggestions={isLoadingPeopleSuggestions} peopleSuggestions={peopleSuggestions} loadPeopleSuggestions={loadPeopleSuggestions}
		isLoadingCcnlSuggestions={isLoadingCcnlSuggestions} ccnlSuggestions={ccnlSuggestions} loadCcnlSuggestions={loadCcnlSuggestions}
		isLoadingCcnlLevelsSuggestions={isLoadingCcnlLevelsSuggestions} ccnlLevelsSuggestions={ccnlLevelsSuggestions} loadCcnlLevelsSuggestions={loadCcnlLevelsSuggestions} setCcnlLevelsSuggestionsExtraParams={setCcnlLevelsSuggestionsExtraParams}
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

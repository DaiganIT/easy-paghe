import React from 'react';
import { LinearProgress } from '@material-ui/core';
import EventBus from 'eventbusjs';
import ButtonWithLoader from '../common/ButtonWithLoader';
import CompanyDetails from './CompanyDetails';
import CompanyBases from './CompanyBases';
import CompanySummary from './CompanySummary';
import useCompanyForm from './useCompanyForm';
import ChoiceDialog from '../dialogs/ChoiceDialog';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import useChoiceDialog from '../dialogs/useChoiceDialog';
import useConfirmDialog from '../dialogs/useConfirmDialog';
import Page from '../common/Page';
import buildStepMap from './stepsMap';
import SimpleStepper from '../common/SimpleStepper';

function EditCompany({ match, history }) {
	const onUpdate = () => {
		EventBus.dispatch('global-notification-show', undefined, { message: 'Azienda aggiornata' });
	};

	const onDelete = () => {
		history.push('/index/companies');
	};

	const { isSaving, setIsSaving, isDeleting, isLoading, company, updateField, updateBaseField, addBase, deleteBase, 
		hasEmployees, 
		setIsDeleting, errors, previousStep, activeStep, steps, next, prev, moveToStep } = useCompanyForm({
		loadId: match.params.companyId,
		onSave: onUpdate,
		onDelete,
		baseTab: 2
	});

	const deleteCompanyChoices = [
		{
			text: 'Annulla',
		},
		{
			text: 'Elimina',
			action: () => setIsDeleting({ withEmployees: true }),
			autoFocus: true
		},
		{
			text: 'Licenzia',
			action: () => setIsDeleting()
		}
	];
	const [ isDeleteCompanyChoiceDialogOpen, openDeleteCompanyChoiceDialog, closeDeleteCompanyChoiceDialog ] = useChoiceDialog({ choices: deleteCompanyChoices });
	const [ isDeleteCompanyDialogOpen, openDeleteCompanyDialog, closeDeleteCompanyDialog, closeDeleteCompanyConfirm ] = useConfirmDialog({ confirmAction: () => setIsDeleting(true) });

	const save = () => {
		setIsSaving(true);
	};

	const deleteButton = (
		<ButtonWithLoader
			variant="contained"
			size="small"
			color="primary"
			onClick={() => hasEmployees() ? openDeleteCompanyChoiceDialog() : openDeleteCompanyDialog()}
			isLoading={isDeleteCompanyChoiceDialogOpen || isDeleteCompanyDialogOpen || isDeleting || isLoading}
		>
			Elimina
		</ButtonWithLoader>
	);



	const companyDetails = <CompanyDetails company={company} isSaving={isSaving} updateField={updateField} errors={errors} />;
	const bases = <CompanyBases bases={company.bases} isSaving={isSaving} addBase={addBase} deleteBase={deleteBase} updateBaseField={updateBaseField} errors={errors} />;
	const summary = <CompanySummary company={company} errors={errors} moveToStep={moveToStep} />

	const stepMap = buildStepMap(companyDetails, bases, summary);

	return (
		<Page title="Modifica Azienda" menuComponent={deleteButton} noPaper>
			{isLoading ? <LinearProgress /> : undefined}
			<SimpleStepper previousStep={previousStep} activeStep={activeStep} steps={steps} stepMap={stepMap} next={next} prev={prev} save={save} isLoading={isLoading || isSaving} />

			<ConfirmDialog
				open={isDeleteCompanyDialogOpen}
				id="delete-company"
				onClose={closeDeleteCompanyDialog}
				title="Eliminare questa azienda?"
				onConfirm={closeDeleteCompanyConfirm}>
				Sei sicuro di voler eliminare questa azienda?
			</ConfirmDialog>

			<ChoiceDialog
				open={isDeleteCompanyChoiceDialogOpen}
				id="delete-company-with-employees"
				onClose={closeDeleteCompanyChoiceDialog}
				title="Eliminare questa azienda?"
				choices={deleteCompanyChoices}
			>
				L'azienda ha dipendenti assunti, cosa vuoi fare con loro?
			</ChoiceDialog>
		</Page>
	);
}

export default EditCompany;

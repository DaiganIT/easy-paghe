import React from 'react';
import { LinearProgress } from '@material-ui/core';
import EventBus from 'eventbusjs';
import ButtonWithLoader from '../common/ButtonWithLoader';
import CompanyDetails from './CompanyDetails';
import CompanyBases from './CompanyBases';
import CompanySummary from './CompanySummary';
import useCompanyForm from './useCompanyForm';
import ConfirmDialog from '../dialogs/ConfirmDialog';
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

	const { isSaving, setIsSaving, isDeleting, isLoading, company, updateField, updateBaseField, addBase, deleteBase, setIsDeleting, errors, previousStep, activeStep, steps, next, prev, moveToStep } = useCompanyForm({
		loadId: match.params.companyId,
		onSave: onUpdate,
		onDelete,
		baseTab: 2
	});

	const onDeleteConfirm = () => {
		setIsDeleting(true);
	};

	const { isDialogOpen, openDialog, closeDialog, confirmDialog } = useConfirmDialog({
		confirmAction: onDeleteConfirm,
	});

	const save = () => {
		setIsSaving(true);
	};

	const deleteButton = (
		<ButtonWithLoader
			variant="contained"
			size="small"
			color="primary"
			onClick={openDialog}
			isLoading={isDialogOpen || isDeleting || isLoading}
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
			<SimpleStepper previousStep={previousStep} activeStep={activeStep} steps={steps} stepMap={stepMap} next={next} prev={prev} save={save} isLoading={isSaving} />

			<ConfirmDialog
				open={isDialogOpen}
				id="delete-company"
				onClose={closeDialog}
				onConfirm={confirmDialog}
				title="Eliminare questa azienda?"
			>
				L'eliminazione non puo' essere annullata. Sei sicuro?
			</ConfirmDialog>
		</Page>
	);
}

export default EditCompany;

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
import { buildDeleteCompanyChoices, buildDeleteCompanyBaseChoices } from './deleteCompanyChoices';

function EditCompany({ match, history }) {
	const onUpdate = () => {
		EventBus.dispatch('global-notification-show', undefined, { message: 'Azienda aggiornata' });
	};

	const onDelete = () => {
		history.push('/index/companies');
	};

	const { isSaving, setIsSaving, isDeleting, isLoading, company, updateField, updateBaseField, addBase, 
		deleteBase, baseHasEmployees, hasEmployees, isDeletingBase, setIsDeletingBase,
		setIsDeleting, errors, previousStep, activeStep, steps, next, prev, moveToStep } = useCompanyForm({
		loadId: match.params.companyId,
		onSave: onUpdate,
		onDelete,
		baseTab: 2
	});

	const deleteCompanyChoices = buildDeleteCompanyChoices({ setIsDeleting });
	const deleteCompanyBaseChoices = buildDeleteCompanyBaseChoices({ setIsDeletingBase });
	const [ isDeleteCompanyChoiceDialogOpen, openDeleteCompanyChoiceDialog, closeDeleteCompanyChoiceDialog ] = useChoiceDialog({ choices: deleteCompanyChoices });
	const [ isDeleteCompanyBaseChoiceDialogOpen, openDeleteCompanyBaseChoiceDialog, closeDeleteCompanyBaseChoiceDialog ] = useChoiceDialog({ choices: deleteCompanyBaseChoices });
	const [ isDeleteCompanyDialogOpen, openDeleteCompanyDialog, closeDeleteCompanyDialog, closeDeleteCompanyConfirm ] = useConfirmDialog({ confirmAction: () => setIsDeleting() });
	const [ isDeleteCompanyBaseDialogOpen, openDeleteCompanyBaseDialog, closeDeleteCompanyBaseDialog, closeDeleteCompanyBaseConfirm ] = useConfirmDialog({ confirmAction: (options) => setIsDeletingBase(options) });

	const deleteCompanyBase = ({ baseId, index }) => {
		if (!baseId) { deleteBase({ baseId, index }); return; }
		if (!baseHasEmployees({ index })) { openDeleteCompanyBaseDialog({ baseId, index }); return; }
		openDeleteCompanyBaseChoiceDialog({ baseId, index });
	}

	const deleteButton = (
		<ButtonWithLoader
			variant="contained"
			size="small"
			color="primary"
			onClick={() => hasEmployees() ? openDeleteCompanyChoiceDialog() : openDeleteCompanyDialog()}
			isLoading={isDeleteCompanyChoiceDialogOpen || isDeleteCompanyDialogOpen || isDeleting || isLoading || isSaving || isDeletingBase}
		>
			Elimina
		</ButtonWithLoader>
	);

	const companyDetails = <CompanyDetails company={company} isSaving={isSaving} updateField={updateField} errors={errors} />;
	const bases = <CompanyBases bases={company.bases} isSaving={isSaving} addBase={addBase} deleteBase={deleteCompanyBase} updateBaseField={updateBaseField} errors={errors} />;
	const summary = <CompanySummary company={company} errors={errors} moveToStep={moveToStep} />

	const stepMap = buildStepMap(companyDetails, bases, summary);

	return (
		<Page title="Modifica Azienda" menuComponent={deleteButton} noPaper>
			{isLoading ? <LinearProgress /> : undefined}
			<SimpleStepper previousStep={previousStep} activeStep={activeStep} steps={steps} stepMap={stepMap} next={next} prev={prev} save={() => setIsSaving(true)} isLoading={isLoading || isSaving} />

			<ConfirmDialog
				open={isDeleteCompanyDialogOpen}
				id="delete-company"
				onClose={closeDeleteCompanyDialog}
				title="Eliminare questa azienda?"
				onConfirm={closeDeleteCompanyConfirm}>
				Sei sicuro di voler eliminare questa azienda?
			</ConfirmDialog>

			<ConfirmDialog
				open={isDeleteCompanyBaseDialogOpen}
				id="delete-company-base"
				onClose={closeDeleteCompanyBaseDialog}
				title="Eliminare questa sede?"
				onConfirm={closeDeleteCompanyBaseConfirm}>
				Sei sicuro di voler eliminare questa sede?
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

			<ChoiceDialog
				open={isDeleteCompanyBaseChoiceDialogOpen}
				id="delete-company-base-with-employees"
				onClose={closeDeleteCompanyBaseChoiceDialog}
				title="Eliminare questa sede?"
				choices={deleteCompanyBaseChoices}
			>
				La sede ha dipendenti assunti, cosa vuoi fare con loro?
			</ChoiceDialog>
		</Page>
	);
}

export default EditCompany;

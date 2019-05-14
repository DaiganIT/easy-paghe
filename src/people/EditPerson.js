import React from 'react';
import EventBus from 'eventbusjs';
import ButtonWithLoader from '../common/ButtonWithLoader';
import LinearProgress from '@material-ui/core/LinearProgress';
import PersonDetails from './PersonDetails';
import usePersonForm from './usePersonForm';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import useConfirmDialog from '../dialogs/useConfirmDialog';
import Page from '../common/Page';
import PersonSummary from './PersonSummary';
import SimpleStepper from '../common/SimpleStepper';
import buildStepMap from './stepsMap';

function EditPerson({ match, history }) {
	const onUpdate = () => {
		EventBus.dispatch('global-notification-show', undefined, { message: 'Persona aggiornata' });
	};

	const onDelete = () => {
		history.push('/index/people');
	};

	const { isSaving, setIsSaving, isDeleting, isLoading, person, updateField, 
		setIsDeleting, errors, previousStep, activeStep, steps, next, prev, moveToStep } = usePersonForm({
		loadId: match.params.personId,
		onSave: onUpdate,
		onDelete,
		baseTab: 1
	});

	const [ isDeletePersonDialogOpen, openDeletePersonDialog, closeDeletePersonDialog, closeDeletePersonConfirm ] = useConfirmDialog({ confirmAction: () => setIsDeleting() });

	const save = () => {
		setIsSaving(true);
	};

	const deleteButton = (
		<ButtonWithLoader
			id="delete-person-button"
			variant="contained"
			size="small"
			color="primary"
			onClick={openDeletePersonDialog}
			isLoading={isDeletePersonDialogOpen || isDeleting || isLoading || isSaving}
		>
			Elimina
		</ButtonWithLoader>
	);

	const personDetails = <PersonDetails person={person} updateField={updateField} isSaving={isSaving} errors={errors} />
	const personSummary = <PersonSummary person={person} moveToStep={moveToStep} errors={errors} />

	const stepMap = buildStepMap(personDetails, personSummary);

	return (
		<Page title="Modifica Persona" menuComponent={deleteButton} noPaper>
			{isLoading ? <LinearProgress id="edit-person-progress" /> : undefined}
			<SimpleStepper previousStep={previousStep} activeStep={activeStep} steps={steps} stepMap={stepMap} next={next} prev={prev} save={save} isLoading={isSaving} />

			<ConfirmDialog
				open={isDeletePersonDialogOpen}
				id="delete-person"
				onClose={closeDeletePersonDialog}
				onConfirm={closeDeletePersonConfirm}
				title="Eliminare questa persona?"
			>
				Sei sicuro di volere eliminare questa persona?
			</ConfirmDialog>
		</Page>
	);
}

export default EditPerson;

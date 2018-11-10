import React from 'react';
import EventBus from 'eventbusjs';
import ButtonWithLoader from '../common/ButtonWithLoader';
import LinearProgress from '@material-ui/core/LinearProgress';
import PersonDetails from './PersonDetails';
import usePersonForm from './usePersonForm';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import useConfirmDialog from '../dialogs/useConfirmDialog';
import Page from '../common/Page';

function EditPerson({ match, history }) {
	const onUpdate = () => {
		EventBus.dispatch('global-notification-show', undefined, { message: 'Persona aggiornata' });
	};

	const onDelete = () => {
		history.push('/index/people');
	};

	const {
		isLoading,
		isSaving,
		setIsSaving,
		isDeleting,
		setIsDeleting,
		name,
		setName,
		address,
		setAddress,
		phone,
		setPhone,
		email,
		setEmail,
	} = usePersonForm({ loadId: match.params.personId, onSave: onUpdate, onDelete });

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

	return (
		<Page title="Modifica Persona" menuComponent={deleteButton} noPaper>
			{isLoading ? <LinearProgress /> : undefined}
			<form>
				<PersonDetails
					form={{ name, address, phone, email, setName, setAddress, setPhone, setEmail }}
					isSaving={isSaving}
				/>
			</form>
			<ButtonWithLoader
				variant="contained"
				size="small"
				color="primary"
				onClick={save}
				isLoading={isSaving || isLoading}
			>
				Salva
			</ButtonWithLoader>
			<ConfirmDialog
				open={isDialogOpen}
				id="delete-person"
				onClose={closeDialog}
				onConfirm={confirmDialog}
				title="Eliminare questa persona?"
			>
				L'eliminazione non puo' essere annullata. Sei sicuro?
			</ConfirmDialog>
		</Page>
	);
}

export default EditPerson;

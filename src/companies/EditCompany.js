import React from 'react';
import { withStyles } from '@material-ui/core';
import EventBus from 'eventbusjs';
import ButtonWithLoader from '../common/ButtonWithLoader';
import LinearProgress from '@material-ui/core/LinearProgress';
import CompanyDetails from './CompanyDetails';
import useCompanyForm from './useCompanyForm';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import useConfirmDialog from '../dialogs/useConfirmDialog';
import Page from '../common/Page';

const styles = {
	companyDetails: {
		marginRight: '1em',
	},
};

function EditCompany({ classes, match, history }) {
	const onUpdate = () => {
		EventBus.dispatch('global-notification-show', undefined, { message: 'Azienda aggiornata' });
	};

	const onDelete = () => {
		history.push('/index/companies');
	};

	const {
		isLoading,
		isSaving,
		setIsSaving,
		isDeleting,
		setIsDeleting,
		company,
		updateField,
		updateBaseField,
		selectedBaseIndex, addBase, deleteBase, selectBase
	} = useCompanyForm({ loadId: match.params.companyId, onSave: onUpdate, onDelete });

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
		<Page title="Modifica Azienda" menuComponent={deleteButton} noPaper>
			{isLoading ? <LinearProgress /> : undefined}
			<form>
				<CompanyDetails
					company={company}
					updateField={updateField}
					updateBaseField={updateBaseField}
					isSaving={isSaving}
					withEmployees={true}
					selectedBaseIndex={selectedBaseIndex} 
					addBase={addBase} 
					deleteBase={deleteBase}
					selectBase={selectBase}
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

export default withStyles(styles)(EditCompany);

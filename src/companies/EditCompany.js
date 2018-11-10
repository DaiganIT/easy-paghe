import React from 'react';
import EventBus from 'eventbusjs';
import ButtonWithLoader from '../common/ButtonWithLoader';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import CompanyDetails from './CompanyDetails';
import Employees from './Employees';
import useCompanyForm from './useCompanyForm';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import useConfirmDialog from '../dialogs/useConfirmDialog';
import Page from '../common/Page';

function EditCompany({ match, history }) {
	const onUpdate = () => {
		EventBus.dispatch('global-notification-show', undefined, 'Azienda aggiornata');
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
		name,
		setName,
		address,
		setAddress,
		phone,
		setPhone,
		employees,
		setEmployees,
	} = useCompanyForm({ loadId: match.params.companyId }, onUpdate, onDelete);

	const onDeleteConfirm = () => {
		setIsDeleting(true);
	};

	const { isDialogOpen, openDialog, closeDialog, confirmDialog } = useConfirmDialog(onDeleteConfirm);

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
				<Grid container>
					<Grid item xs={6}>
						<CompanyDetails
							form={{ name, address, phone, setName, setAddress, setPhone }}
							isSaving={isSaving}
						/>
					</Grid>
					<Grid item xs={6}>
						<Employees employees={employees} setEmployees={setEmployees} />
					</Grid>
				</Grid>
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

export default EditCompany;

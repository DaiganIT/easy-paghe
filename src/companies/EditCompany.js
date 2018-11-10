import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CompanyDetails from './CompanyDetails';
import Employees from './Employees';
import useCompanyForm from './useCompanyForm';
import http from './http';
import axios from 'axios';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import useConfirmDialog from '../dialogs/useConfirmDialog';
import Page from '../common/Page';

const styles = {
};
function EditCompany({ classes, match, history }) {
	const {
		isSaving,
		setIsSaving,
		name,
		setName,
		address,
		setAddress,
		phone,
		setPhone,
		employees,
		setEmployees,
		setForm,
	} = useCompanyForm({});

	const deleteCompany = (companyId) => {
		const { promise, tokenSource } = http.deleteCompany(companyId);
		promise.then(() => {
			history.push('/index/companies');
		});
	};

	const { isDialogOpen, openDialog, closeDialog, confirmDialog } = useConfirmDialog(() =>
		deleteCompany(match.params.companyId),
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const { promise, tokenSource } = http.loadCompany(match.params.companyId);
		promise
			.then(({ data }) => {
				setIsLoading(false);
				setForm(data);
			})
			.catch((error) => {
				if (!axios.isCancel(error)) {
					setIsLoading(false);
				}
			});

		return function cleanup() {
			if (isLoading) tokenSource.cancel();
		};
	}, []);

	const save = () => {
		setIsSaving(true);
	};

	const deleteButton = (
		<Button variant="contained" color="secondary" onClick={openDialog}>
			Elimina
		</Button>
	);

	return (
		<Page title="Modifica Azienda" menuComponent={deleteButton} noPaper>
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
			<Button variant="contained" size="small" color="primary" onClick={save} disabled={isSaving}>
				Salva
			</Button>
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

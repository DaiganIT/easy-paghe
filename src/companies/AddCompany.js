import React from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CompanyDetails from './CompanyDetails';
import Employees from './Employees';
import useCompanyForm from './useCompanyForm';
import Page from '../common/Page';

const styles = {
};

function AddCompany({ classes }) {
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
	} = useCompanyForm({});

	const save = () => {
		setIsSaving(true);
	};

	return (
		<Page title="Aggiungi Azienda">
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
		</Page>
	);
}

export default withStyles(styles)(AddCompany);

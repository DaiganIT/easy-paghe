import React from 'react';
import EventBus from 'eventbusjs';
import Grid from '@material-ui/core/Grid';
import CompanyDetails from './CompanyDetails';
import Employees from './Employees';
import useCompanyForm from './useCompanyForm';
import Page from '../common/Page';
import ButtonWithLoader from '../common/ButtonWithLoader';

function AddCompany({ history }) {
	const onCreate = ({ id }) => {
		history.push(`/index/companies/${id}`);
		EventBus.dispatch('global-notification-show', undefined, { message: 'Azienda creata' });
	};

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
	} = useCompanyForm({ onSave: onCreate });

	const save = () => {
		setIsSaving(true);
	};

	return (
		<Page title="Aggiungi Azienda" noPaper>
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
			<ButtonWithLoader variant="contained" size="small" color="primary" onClick={save} isLoading={isSaving}>
				Save
			</ButtonWithLoader>
		</Page>
	);
}

export default AddCompany;

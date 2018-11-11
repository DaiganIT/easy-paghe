import React from 'react';
import EventBus from 'eventbusjs';
import CompanyDetails from './CompanyDetails';
import useCompanyForm from './useCompanyForm';
import Page from '../common/Page';
import ButtonWithLoader from '../common/ButtonWithLoader';

function AddCompany({ history }) {
	const onCreate = ({ id }) => {
		history.push(`/index/companies/${id}`);
		EventBus.dispatch('global-notification-show', undefined, { message: 'Azienda creata' });
	};

	const { isSaving, setIsSaving, name, setName, address, setAddress, phone, setPhone } = useCompanyForm({
		onSave: onCreate,
	});

	const save = () => {
		setIsSaving(true);
	};

	return (
		<Page title="Aggiungi Azienda" noPaper>
			<form>
				<CompanyDetails form={{ name, address, phone, setName, setAddress, setPhone }} isSaving={isSaving} />
			</form>
			<ButtonWithLoader variant="contained" size="small" color="primary" onClick={save} isLoading={isSaving}>
				Salva
			</ButtonWithLoader>
		</Page>
	);
}

export default AddCompany;

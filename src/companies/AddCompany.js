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

	const { isSaving, setIsSaving, company, updateField, updateBaseField } = useCompanyForm({
		onSave: onCreate,
	});

	const save = () => {
		setIsSaving(true);
	};

	return (
		<Page title="Aggiungi Azienda" noPaper>
			<form>
				<CompanyDetails company={company} isSaving={isSaving} updateField={updateField} updateBaseField={updateBaseField} />
			</form>
			<ButtonWithLoader variant="contained" size="small" color="primary" onClick={save} isLoading={isSaving}>
				Salva
			</ButtonWithLoader>
		</Page>
	);
}

export default AddCompany;

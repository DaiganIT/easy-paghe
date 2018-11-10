import React from 'react';
import EventBus from 'eventbusjs';
import PersonDetails from './PersonDetails';
import usePersonForm from './usePersonForm';
import Page from '../common/Page';
import ButtonWithLoader from '../common/ButtonWithLoader';

function AddPerson({ history }) {
	const onCreate = ({ id }) => {
		history.push(`/index/people/${id}`);
		EventBus.dispatch('global-notification-show', undefined, { message: 'Persona creata' });
	};

	const { isSaving, setIsSaving, name, setName, address, setAddress, phone, setPhone, email, setEmail } = usePersonForm({
		onSave: onCreate,
	});

	const save = () => {
		setIsSaving(true);
	};

	return (
		<Page title="Aggiungi Persona" noPaper>
			<form>
				<PersonDetails form={{ name, address, phone, email, setName, setAddress, setPhone, setEmail }} isSaving={isSaving} />
			</form>
			<ButtonWithLoader variant="contained" size="small" color="primary" onClick={save} isLoading={isSaving}>
				Salva
			</ButtonWithLoader>
		</Page>
	);
}

export default AddPerson;

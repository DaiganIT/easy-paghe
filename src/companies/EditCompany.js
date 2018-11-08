import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CompanyDetails from './CompanyDetails';
import Employees from './Employees';
import useCompanyForm from './useCompanyForm';
import http from './http';
import axios from 'axios';

const styles = {
	menu: {
		display: 'flex',
		marginBottom: '1em',
	},
	grow: {
		flexGrow: 1,
	},
};
function EditCompany({ classes, match }) {
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

	return (
		<div>
			<span className={classes.menu}>
				<Typography variant="title" className={classes.grow}>
					Modifica Azienda
				</Typography>
			</span>
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
		</div>
	);
}

export default withStyles(styles)(EditCompany);

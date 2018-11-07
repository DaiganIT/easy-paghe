import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import http from './http';

const styles = {
	menu: {
		display: 'flex',
		marginBottom: '1em',
	},
	paper: {
		padding: '1em',
		marginBottom: '1em',
	},
	grow: {
		flexGrow: 1,
	},
	textField: {
		marginRight: '1em',
	},
};
function EditCompany({ classes }) {
	const [isSaving, setIsSaving] = useState(false);
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');

	useEffect(
		() => {
			if (isSaving) {
				http.createCompany({ name, address, phone })
					.then(() => {
						setIsSaving(false);
					})
					.catch(() => {
						setIsSaving(false);
					});
			}
		},
		[isSaving],
	);

	const save = () => {
		setIsSaving(true);
	};

	return (
		<div>
			<span className={classes.menu}>
				<Typography variant="title" className={classes.grow}>
					Aggiungi Azienda
				</Typography>
			</span>
			<Paper className={classes.paper}>
				<form>
					<TextField label="Nome" className={classes.textField} disabled={isSaving} value={name} onChange={e => setName(e.target.value)} />
					<TextField label="Indirizzo" className={classes.textField} disabled={isSaving} value={address} onChange={e => setAddress(e.target.value)} />
					<TextField label="Telefono" className={classes.textField} disabled={isSaving} value={phone} onChange={e => setPhone(e.target.value)} />
				</form>
			</Paper>
			<Button variant="contained" size="small" color="primary" onClick={save} disabled={isSaving}>
				Salva
			</Button>
		</div>
	);
}

export default withStyles(styles)(EditCompany);

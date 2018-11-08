import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
	companyDetails: {
		marginRight: '1em',
	},
	grow: {
		flexGrow: 1,
	},
	textField: {
		marginRight: '1em',
		marginBottom: '1em',
	},
	miniTitle: {
		marginBottom: '1em',
	},
};
function EditCompany({ classes }) {
	const [isSaving, setIsSaving] = useState(false);
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [employees, setEmployees] = useState([]);

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
			<form>
				<Grid container>
					<Grid item xs={6}>
						<Paper className={classnames(classes.paper, classes.companyDetails)}>
							<Typography variant="title" className={classes.miniTitle}>
								Dettagli azienda
							</Typography>
							<TextField
								variant="outlined"
								label="Nome"
								fullWidth
								className={classes.textField}
								disabled={isSaving}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<TextField
								variant="outlined"
								label="Indirizzo"
								fullWidth
								className={classes.textField}
								disabled={isSaving}
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
							<TextField
								variant="outlined"
								label="Telefono"
								fullWidth
								className={classes.textField}
								disabled={isSaving}
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</Paper>
					</Grid>
					<Grid item xs={6}>
						<Paper className={classes.paper}>
							<Typography variant="title" className={classes.miniTitle}>
								Dipendenti
							</Typography>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Nome</TableCell>
										<TableCell>Indirizzo</TableCell>
										<TableCell>Telefono</TableCell>
										<TableCell>Email</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{employees.map((employee) => (
										<TableRow key={employee.id}>
											<TableCell component="th" scope="row">
												{employee.name}
											</TableCell>
											<TableCell>{employee.address}</TableCell>
											<TableCell>{employee.phone}</TableCell>
											<TableCell>{employee.email}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Paper>
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

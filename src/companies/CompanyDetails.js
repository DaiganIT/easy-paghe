import React from 'react';
import { withStyles, Paper, Typography, TextField, Grid } from '@material-ui/core';

const styles = {
	paper: {
		padding: '1em',
		marginBottom: '1em',
	},
	miniTitle: {
		marginBottom: '1em',
	},
	textField: {
		marginRight: '1em',
		marginBottom: '1em',
	}
}

function CompanyDetails({ classes, isSaving, company, updateField, updateBaseField }) {
	return (
		<Grid container spacing={24}>
			<Grid item lg={6} xs={12}>
				<Paper className={classes.paper}>
					<Typography variant="title" className={classes.miniTitle}>
						Dettagli azienda
			</Typography>
					<TextField
						variant="outlined"
						label="Nome"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={company.name}
						onChange={(e) => updateField('name', e.target.value)}
					/>
					<TextField
						variant="outlined"
						label="Codice Fiscale"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={company.address}
						onChange={(e) => updateField('fiscalCode', e.target.value)}
					/>
					<TextField
						variant="outlined"
						label="Partita IVA"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={company.phone}
						onChange={(e) => updateField('ivaCode', e.target.value)}
					/>
					<TextField
						variant="outlined"
						label="Codice INPS"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={company.phone}
						onChange={(e) => updateField('inpsRegistrationNumber', e.target.value)}
					/>
					<TextField
						variant="outlined"
						label="Codice INAIL"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={company.phone}
						onChange={(e) => updateField('inailRegistrationNumber', e.target.value)}
					/>
				</Paper>
			</Grid>
			<Grid item lg={6} xs={12}>
				
			</Grid>
		</Grid>
	);
}

export default withStyles(styles)(CompanyDetails);
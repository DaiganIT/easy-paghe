import React from 'react';
import { withStyles, Paper, Typography, TextField, Grid } from '@material-ui/core';
import CompanyBases from './CompanyBases';
import CompanyBase from './CompanyBase';

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

function CompanyDetails({ classes, isSaving, company, updateField, updateBaseField, selectedBaseIndex }) {
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
						value={company.fiscalCode}
						onChange={(e) => updateField('fiscalCode', e.target.value)}
					/>
					<TextField
						variant="outlined"
						label="Partita IVA"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={company.ivaCode}
						onChange={(e) => updateField('ivaCode', e.target.value)}
					/>
					<TextField
						variant="outlined"
						label="Codice INPS"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={company.inpsRegistrationNumber}
						onChange={(e) => updateField('inpsRegistrationNumber', e.target.value)}
					/>
					<TextField
						variant="outlined"
						label="Codice INAIL"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={company.inailRegistrationNumber}
						onChange={(e) => updateField('inailRegistrationNumber', e.target.value)}
					/>
				</Paper>
			</Grid>
			<Grid item lg={6} xs={12}>
				<CompanyBases bases={company.bases} />
			</Grid>
			<Grid item lg={6} xs={12}>
				<CompanyBase base={company.bases[selectedBaseIndex]} updateBaseField={updateBaseField} index={selectedBaseIndex}/>
			</Grid>
		</Grid>
	);
}

export default withStyles(styles)(CompanyDetails);
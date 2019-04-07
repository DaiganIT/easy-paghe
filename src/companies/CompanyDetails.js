import React from 'react';
import { withStyles, TextField, Grid } from '@material-ui/core';

const styles = {
	textField: {
		marginRight: '1em',
		marginBottom: '1em',
	}
}

function CompanyDetails({ classes, isSaving, company, updateField }) {
	return (
		<React.Fragment>
			<Grid container spacing={16}>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						label="Nome"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={company.name}
						onChange={(e) => updateField('name', e.target.value)}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						variant="outlined"
						fullWidth
						label="Codice Fiscale"
						className={classes.textField}
						disabled={isSaving}
						value={company.fiscalCode}
						onChange={(e) => updateField('fiscalCode', e.target.value)}
					/></Grid>
				<Grid item xs={6}>
					<TextField
						variant="outlined"
						fullWidth
						label="Partita IVA"
						className={classes.textField}
						disabled={isSaving}
						value={company.ivaCode}
						onChange={(e) => updateField('ivaCode', e.target.value)}
					/></Grid>
				<Grid item xs={6}>
					<TextField
						variant="outlined"
						fullWidth
						label="Codice INPS"
						className={classes.textField}
						disabled={isSaving}
						value={company.inpsRegistrationNumber}
						onChange={(e) => updateField('inpsRegistrationNumber', e.target.value)}
					/></Grid>
				<Grid item xs={6}>
					<TextField
						variant="outlined"
						fullWidth
						label="Codice INAIL"
						className={classes.textField}
						disabled={isSaving}
						value={company.inailRegistrationNumber}
						onChange={(e) => updateField('inailRegistrationNumber', e.target.value)}
					/></Grid>
			</Grid>
		</React.Fragment>
	);
}

export default withStyles(styles)(CompanyDetails);
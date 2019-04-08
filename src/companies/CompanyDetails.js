import React from 'react';
import { withStyles, TextField, Grid } from '@material-ui/core';

const styles = {
	textField: {
		marginRight: '1em',
		marginBottom: '1em',
	}
}

function CompanyDetails({ classes, isSaving, company, updateField, errors }) {
	return (
		<React.Fragment>
			<Grid container spacing={16}>
				<Grid item xs={12}>
					<TextField
						error={!!errors.name}
						required
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
						error={!!errors.fiscalCode}
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
						error={!!errors.ivaCode}
						variant="outlined"
						fullWidth
						label="Partita IVA"
						type="number"
						className={classes.textField}
						disabled={isSaving}
						value={company.ivaCode}
						onChange={(e) => updateField('ivaCode', e.target.value)}
					/></Grid>
				<Grid item xs={6}>
					<TextField
						error={!!errors.inpsRegistrationNumber}
						variant="outlined"
						fullWidth
						label="Codice INPS"
						type="number"
						className={classes.textField}
						disabled={isSaving}
						value={company.inpsRegistrationNumber}
						onChange={(e) => updateField('inpsRegistrationNumber', e.target.value)}
					/></Grid>
				<Grid item xs={6}>
					<TextField
						error={!!errors.inailRegistrationNumber}
						variant="outlined"
						fullWidth
						label="Codice INAIL"
						type="number"
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
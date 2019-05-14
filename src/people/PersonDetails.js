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

function PersonDetails({ classes, isSaving, person, updateField, errors }) {
	return (
		<React.Fragment>
			<Grid container spacing={16}>
				<Grid item xs={12} md={6}>
					<TextField
						id="person-first-name"
						error={!!errors.firstName}
						required
						variant="outlined"
						label="Nome"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={person.firstName}
						onChange={(e) => updateField('firstName', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="person-last-name"
						error={!!errors.lastName}
						required
						variant="outlined"
						label="Cognome"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={person.lastName}
						onChange={(e) => updateField('lastName', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="person-address"
						error={!!errors.address}
						variant="outlined"
						label="Indirizzo"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={person.address}
						onChange={(e) => updateField('address', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="person-phone"
						error={!!errors.phone}
						variant="outlined"
						label="Telefono"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={person.phone}
						onChange={(e) => updateField('phone', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="person-email"
						error={!!errors.email}
						variant="outlined"
						label="Email"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={person.email}
						onChange={(e) => updateField('email', e.target.value)}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default withStyles(styles)(PersonDetails);
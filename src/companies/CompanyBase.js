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

function CompanyBase({ classes, isSaving, base, index, updateBaseField }) {
	return (
		<Grid container spacing={24}>
			<Grid item lg={6} xs={12}>
				<Paper className={classes.paper}>
					<Typography variant="title" className={classes.miniTitle}>
						Dettagli sede
					</Typography>
					<TextField
						variant="outlined"
						label="Nome"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={base.name}
						onChange={(e) => updateBaseField('name', index, e.target.value)}
					/>
					<TextField
						variant="outlined"
						label="Indirizzo"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={base.address}
						onChange={(e) => updateBaseField('address', index, e.target.value)}
					/>
				</Paper>
			</Grid>
			<Grid item lg={6} xs={12}>
				Dipendenti
			</Grid>
		</Grid>
	);
}

export default withStyles(styles)(CompanyBase);
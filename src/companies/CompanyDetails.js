import React from 'react';
import classnames from 'classnames';
import { withStyles, Paper, Typography, TextField } from '@material-ui/core';

const styles = {
  paper: {
    padding: '1em',
		marginBottom: '1em',
  },
  companyDetails: {
    marginRight: '1em',
  },
  miniTitle: {
    marginBottom: '1em',
  },
  textField: {
    marginRight: '1em',
		marginBottom: '1em',
  }
}

function CompanyDetails({ classes, isSaving, form }) {
	return (
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
				value={form.name}
				onChange={(e) => form.setName(e.target.value)}
			/>
			<TextField
				variant="outlined"
				label="Indirizzo"
				fullWidth
				className={classes.textField}
				disabled={isSaving}
				value={form.address}
				onChange={(e) => form.setAddress(e.target.value)}
			/>
			<TextField
				variant="outlined"
				label="Telefono"
				fullWidth
				className={classes.textField}
				disabled={isSaving}
				value={form.phone}
				onChange={(e) => form.setPhone(e.target.value)}
			/>
		</Paper>
	);
}

export default withStyles(styles)(CompanyDetails);
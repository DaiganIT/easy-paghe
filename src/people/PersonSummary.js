import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import ButtonWithLoader from '../common/ButtonWithLoader';

import SummaryItem from '../common/SummaryItem';

const styles = theme => ({
	withBorder: {
		borderBottom: `1px solid ${theme.palette.divider}`
	}
});

function PersonSummary({ classes, person, errors, moveToStep }) {
	return (
		<React.Fragment>
			<Grid container spacing={16}>
				<Grid item xs={12} className={classes.withBorder}>
					<Grid container justify="space-between">
						<Grid item xs={6}>
							<Typography variant="title">
								Dettagli persona
							</Typography>
						</Grid>
						<Grid item xs={6} align="right">
							<ButtonWithLoader id="person-summary-edit-details" variant="contained" size="small" color="primary" onClick={() => moveToStep(0)}>
								Modifica
							</ButtonWithLoader>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} className="summary-item">
					<SummaryItem name="Nome" value={person.firstName} errors={errors.name} />
				</Grid>
				<Grid item xs={12} className="summary-item">
					<SummaryItem name="Cognome" value={company.lastName} errors={errors.fiscalCode} />
				</Grid>
				<Grid item xs={12} className="summary-item">
					<SummaryItem name="Indirizzo" value={person.address} errors={errors.ivaCode} />
				</Grid>
				<Grid item xs={12} className="summary-item">
					<SummaryItem name="Telefono" value={person.phone} errors={errors.inpsRegistrationNumber} />
				</Grid>
				<Grid item xs={12} className="summary-item">
					<SummaryItem name="Email" value={person.email} errors={errors.inailRegistrationNumber} />
				</Grid>
			</Grid>
		</React.Fragment >
	);
}

export default withStyles(styles)(PersonSummary);
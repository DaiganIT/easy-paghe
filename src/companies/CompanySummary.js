import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';

import SummaryItem from './SummaryItem';

const styles = theme => ({
	withBorder: {
		borderBottom: `1px solid ${theme.palette.divider}`
	}
});

function CompanySummary({ classes, company }) {
	return (
		<React.Fragment>
			<Grid container spacing={16}>
				<Grid item xs={12} className={classes.withBorder}>
					<Typography variant="title">
						Dettagli azienda
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<SummaryItem name="Nome" value={company.name} />
				</Grid>
				<Grid item xs={12}>
					<SummaryItem name="Codice Fiscale" value={company.fiscalCode} />
				</Grid>
				<Grid item xs={12}>
					<SummaryItem name="Partita IVA" value={company.ivaCode} />
				</Grid>
				<Grid item xs={12}>
					<SummaryItem name="Codice INPS" value={company.inpsRegistrationNumber} />
				</Grid>
				<Grid item xs={12}>
					<SummaryItem name="Codice INAIL" value={company.inailRegistrationNumber} />
				</Grid>
				<Grid item xs={12} className={classes.withBorder}>
					<Typography variant="title">
						Sedi azienda
					</Typography>
				</Grid>
				<Grid item xs={12}>
					{company.bases.map((base, index) =>
						<Grid container spacing={16} key={index}>
							<Grid item xs={12}>
								<SummaryItem name="Nome" value={base.name} />
							</Grid>
							<Grid item xs={12}>
								<SummaryItem name="Indirizzo" value={base.address} />
							</Grid>
						</Grid>)}
				</Grid>
			</Grid>
		</React.Fragment >
	);
}

export default withStyles(styles)(CompanySummary);
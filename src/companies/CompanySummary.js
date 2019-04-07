import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';

const styles = {
	textField: {
		marginRight: '1em',
		marginBottom: '1em',
	}
}

function CompanySummary({ classes, company }) {
	return (
		<React.Fragment>
			<Grid container spacing={16}>
				<Grid item xs={12}>
					<Typography variant="h4">
						Dettagli azienda
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography>
						Nome: {company.name}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>
						Codice Fiscale: {company.fiscalCode}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>
						Partita IVA: {company.ivaCode}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>
						Codice INPS: {company.inpsRegistrationNumber}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>
						Codice INAIL: {company.inailRegistrationNumber}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h4">
						Sedi azienda
					</Typography>
				</Grid>
				<Grid item xs={12}>
					{company.bases.map(base =>
						<Grid container spacing={16}>
							<Grid item xs={6}>
								<Typography>
									Nome: {base.name}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography>
									Indirizzo: {base.address}
								</Typography>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
		</React.Fragment >
	);
}

export default withStyles(styles)(CompanySummary);
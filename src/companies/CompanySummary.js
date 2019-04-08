import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import ButtonWithLoader from '../common/ButtonWithLoader';

import SummaryItem from './SummaryItem';

const styles = theme => ({
	withBorder: {
		borderBottom: `1px solid ${theme.palette.divider}`
	}
});

function CompanySummary({ classes, company, errors, moveToStep }) {
	return (
		<React.Fragment>
			<Grid container spacing={16}>
				<Grid item xs={12} className={classes.withBorder}>
					<Grid container justify="space-between">
						<Grid item xs={6}>
							<Typography variant="title">
								Dettagli azienda
							</Typography>
						</Grid>
						<Grid item xs={6} align="right">
							<ButtonWithLoader variant="contained" size="small" color="primary" onClick={() => moveToStep(0)}>
								Modifica
							</ButtonWithLoader>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<SummaryItem name="Nome" value={company.name} errors={errors.name} />
				</Grid>
				<Grid item xs={12}>
					<SummaryItem name="Codice Fiscale" value={company.fiscalCode} errors={errors.fiscalCode} />
				</Grid>
				<Grid item xs={12}>
					<SummaryItem name="Partita IVA" value={company.ivaCode} errors={errors.ivaCode} />
				</Grid>
				<Grid item xs={12}>
					<SummaryItem name="Codice INPS" value={company.inpsRegistrationNumber} errors={errors.inpsRegistrationNumber} />
				</Grid>
				<Grid item xs={12}>
					<SummaryItem name="Codice INAIL" value={company.inailRegistrationNumber} errors={errors.inailRegistrationNumber} />
				</Grid>
				<Grid item xs={12} className={classes.withBorder}>
				<Grid container justify="space-between">
						<Grid item xs={6}>
							<Typography variant="title">
								Sedi azienda
							</Typography>
						</Grid>
						<Grid item xs={6} align="right">
							<ButtonWithLoader variant="contained" size="small" color="primary" onClick={() => moveToStep(1)}>
								Modifica
							</ButtonWithLoader>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					{company.bases.map((base, index) =>
						<Grid container spacing={16} key={index}>
							<Grid item xs={12}>
								<SummaryItem name="Nome" value={base.name} errors={(() => !!errors.bases ? errors.bases[index].name : null)()} />
							</Grid>
							<Grid item xs={12}>
								<SummaryItem name="Indirizzo" value={base.address} errors={(() => !!errors.bases ? errors.bases[index].address : null)()} />
							</Grid>
						</Grid>)}
				</Grid>
			</Grid>
		</React.Fragment >
	);
}

export default withStyles(styles)(CompanySummary);
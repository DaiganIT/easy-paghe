import React from 'react';
import { withStyles, TextField, Grid } from '@material-ui/core';

import Autocomplete from '../common/Autocomplete';

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

function HirePersonDetails({ classes, isSaving, hirePerson, updateField, errors, 
	companySuggestions, loadCompanySuggestions, clearCompanySuggestions 
}) {
	return (
		<React.Fragment>
			<Grid container spacing={16}>
				<Grid item xs={12} md={6}>
					<Autocomplete 
						id="hire-person-company"
						error={!!errors.companyBaseId}
						required
						label="Azienda"
						placeholder="Azienda..."
						disabled={isSaving}
						value={hirePerson.companyId}
						onChange={(e) => updateField('companyId', e.target.value)}
						suggestions={companySuggestions}
						loadSuggestions={loadCompanySuggestions}
						clearSuggestions={clearCompanySuggestions}
						handleSuggestionSelected={() => {}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="hire-person-company-base"
						error={!!errors.companyBaseId}
						required
						variant="outlined"
						label="Sede Azienda"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={hirePerson.companyBaseId}
						onChange={(e) => updateField('companyBaseId', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="hire-person-person"
						error={!!errors.personId}
						variant="outlined"
						label="Persona"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={hirePerson.personId}
						onChange={(e) => updateField('personId', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="hire-person-ccnl"
						error={!!errors.ccnlId}
						variant="outlined"
						label="CCNL"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={hirePerson.ccnlId}
						onChange={(e) => updateField('ccnlId', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="hire-person-salary"
						error={!!errors.salaryTableId}
						variant="outlined"
						label="Livello"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={hirePerson.salaryTableId}
						onChange={(e) => updateField('salaryTableId', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="hire-person-week-hours"
						error={!!errors.weekHours}
						variant="outlined"
						label="Ore a Settimana"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={hirePerson.weekHours}
						onChange={(e) => updateField('weekHours', e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="hire-person-holidays"
						error={!!errors.holidays}
						variant="outlined"
						label="Giorni di Ferie"
						fullWidth
						className={classes.textField}
						disabled={isSaving}
						value={hirePerson.holidays}
						onChange={(e) => updateField('holidays', e.target.value)}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default withStyles(styles)(HirePersonDetails);
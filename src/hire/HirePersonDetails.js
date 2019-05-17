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
	isLoadingCompanySuggestions, companySuggestions, loadCompanySuggestions, clearCompanySuggestions,
	isLoadingCompanyBasesSuggestions, companyBasesSuggestions, loadCompanyBasesSuggestions, clearCompanyBasesSuggestions, setCompanyBasesSuggestionsExtraParams
}) {
	return (
		<React.Fragment>
			<Grid container spacing={16}>
				<Grid item xs={12} md={6}>
					<Autocomplete
						id="hire-person-company"
						error={!!errors.companyId}
						required
						label="Azienda"
						placeholder="Cerca Azienda..."
						disabled={isSaving}
						suggestions={companySuggestions}
						loadSuggestions={loadCompanySuggestions}
						clearSuggestions={clearCompanySuggestions}
						onSuggestionSelected={(suggestion) => { updateField('companyId', suggestion.id); setCompanyBasesSuggestionsExtraParams({ companyId: suggestion.id }); loadCompanyBasesSuggestions({ search: '' }); }}
						/>
				</Grid>
				<Grid item xs={12} md={6}>
				<Autocomplete
						id="hire-person-company-base"
						error={!!errors.companyBaseId}
						required
						label="Sede Azienda"
						placeholder="Cerca Sede Azienda..."
						disabled={isSaving || hirePerson.companyId === 0}
						suggestions={companyBasesSuggestions}
						loadSuggestions={loadCompanyBasesSuggestions}
						clearSuggestions={clearCompanyBasesSuggestions}
						onSuggestionSelected={(suggestion) => { updateField('companyBaseId', suggestion.id); }}
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
						value={hirePerson.person}
						onChange={(e) => updateField('person', e.target.value)}
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
						value={hirePerson.ccnl}
						onChange={(e) => updateField('ccnl', e.target.value)}
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
						value={hirePerson.salaryTable}
						onChange={(e) => updateField('salaryTable', e.target.value)}
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
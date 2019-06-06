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
	isLoadingCompanySuggestions, companySuggestions, loadCompanySuggestions, 
	isLoadingCompanyBasesSuggestions, companyBasesSuggestions, loadCompanyBasesSuggestions, setCompanyBasesSuggestionsExtraParams,
	isLoadingPeopleSuggestions, peopleSuggestions, loadPeopleSuggestions,
	isLoadingCcnlSuggestions, ccnlSuggestions, loadCcnlSuggestions,
	isLoadingCcnlLevelsSuggestions, ccnlLevelsSuggestions, loadCcnlLevelsSuggestions, setCcnlLevelsSuggestionsExtraParams
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
						isLoading={isLoadingCompanySuggestions}
						disabled={isSaving}
						suggestions={companySuggestions}
						loadSuggestions={loadCompanySuggestions}
						onSuggestionSelected={(suggestion) => { updateField('companyId', suggestion.id); setCompanyBasesSuggestionsExtraParams({ companyId: suggestion.id }); loadCompanyBasesSuggestions({ search: '' }); }}
						suggestionAccessor={(s) => s.name}
						/>
				</Grid>
				<Grid item xs={12} md={6}>
				<Autocomplete
						id="hire-person-company-base"
						error={!!errors.companyBaseId}
						required
						label="Sede Azienda"
						placeholder="Cerca Sede Azienda..."
						isLoading={isLoadingCompanyBasesSuggestions}
						disabled={isSaving || hirePerson.companyId === 0}
						suggestions={companyBasesSuggestions}
						loadSuggestions={loadCompanyBasesSuggestions}
						onSuggestionSelected={(suggestion) => { updateField('companyBaseId', suggestion.id); }}
						suggestionAccessor={(s) => s.name}
						/>
				</Grid>
				<Grid item xs={12}>
				<Autocomplete
						id="hire-person-person"
						error={!!errors.personId}
						required
						label="Persona"
						placeholder="Cerca Persona..."
						isLoading={isLoadingPeopleSuggestions}
						disabled={isSaving}
						suggestions={peopleSuggestions}
						loadSuggestions={loadPeopleSuggestions}
						onSuggestionSelected={(suggestion) => { updateField('personId', suggestion.id); }}
						suggestionAccessor={(s) => s.firstName + ' ' + s.lastName}
						/>
				</Grid>
				<Grid item xs={12} md={6}>
				<Autocomplete
						id="hire-person-ccnl"
						error={!!errors.companyId}
						required
						label="CCNL"
						placeholder="Cerca CCNL..."
						isLoading={isLoadingCcnlSuggestions}
						disabled={isSaving}
						suggestions={ccnlSuggestions}
						loadSuggestions={loadCcnlSuggestions}
						onSuggestionSelected={(suggestion) => { updateField('ccnlId', suggestion.id); setCcnlLevelsSuggestionsExtraParams({ ccnlId: suggestion.id }); loadCcnlLevelsSuggestions({ search: '' }); }}
						suggestionAccessor={(s) => s.name}
						/>
				</Grid>
				<Grid item xs={12} md={6}>
				<Autocomplete
						id="hire-person-salary"
						error={!!errors.personId}
						required
						label="Livello"
						placeholder="Cerca Livello..."
						isLoading={isLoadingCcnlLevelsSuggestions}
						disabled={isSaving}
						suggestions={ccnlLevelsSuggestions}
						loadSuggestions={loadCcnlLevelsSuggestions}
						onSuggestionSelected={(suggestion) => { updateField('salaryTableId', suggestion.id); }}
						suggestionAccessor={(s) => s.level}
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
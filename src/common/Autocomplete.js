import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles, TextField, Paper, MenuItem } from '@material-ui/core';

const styles = (theme) => ({
	container: {
		position: 'relative',
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0,
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none',
	},
});

function Autocomplete({ id, label, error, disabled, required, placeholder, classes, suggestions, value, onChange, handleSuggestionSelected, loadSuggestions, clearSuggestions }) {
	const handleSelected = (_, { suggestion }) => {
		handleSuggestionSelected({ suggestion });
	}

	const autosuggestProps = {
		renderInputComponent,
		suggestions: suggestions.items,
		onSuggestionsFetchRequested: loadSuggestions,
		onSuggestionsClearRequested: clearSuggestions,
		onSuggestionSelected: handleSelected,
		getSuggestionValue,
		renderSuggestion,
	};

	return (
		<Autosuggest
			{...autosuggestProps}
			inputProps={{
        id,
        label,
        error,
        disabled,
        required,
				classes,
				placeholder,
				value,
				onChange,
			}}
			theme={{
				container: classes.container,
				suggestionsContainerOpen: classes.suggestionsContainerOpen,
				suggestionsList: classes.suggestionsList,
				suggestion: classes.suggestion,
			}}
			renderSuggestionsContainer={(options) => (
				<Paper {...options.containerProps} square>
					{options.children}
				</Paper>
			)}
		/>
	);
}

function renderInputComponent(inputProps) {
	const { classes, inputRef = () => {}, ref, ...other } = inputProps;

	return (
		<TextField
			variant="outlined"
      fullWidth
			InputProps={{
				inputRef: (node) => {
					ref(node);
					inputRef(node);
				},
				classes: {
					input: classes.input,
				},
			}}
			{...other}
		/>
	);
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

export default withStyles(styles)(Autocomplete);

import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles, TextField, Paper, MenuItem } from '@material-ui/core';
import peopleHttp from '../people/http';
import debounce from 'debounce-promise';

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

const debouncedGet = debounce(peopleHttp.getPeople, 300);

function renderInputComponent(inputProps) {
	const { classes, inputRef = () => {}, ref, ...other } = inputProps;

	return (
		<TextField
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

function AddEmployeeAutocomplete({ classes, people, setPeople, selectedPerson, setSelectedPerson, handleSuggestionSelected }) {
	const handleSuggestionsFetchRequested = ({ value }) => {
		return debouncedGet({ search: value, page: 0, pageLimit: 10 }).then(({ data }) => {
			setPeople(data);
		});
	};

	const handleSuggestionsClearRequested = () => {
		setPeople({ items: [], length: 0 });
	};

	const handleSelected = (e, { suggestion }) => {
		handleSuggestionSelected({ suggestion });
	}

	const autosuggestProps = {
		renderInputComponent,
		suggestions: people.items,
		onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
		onSuggestionsClearRequested: handleSuggestionsClearRequested,
		onSuggestionSelected: handleSelected,
		getSuggestionValue,
		renderSuggestion,
	};

	return (
		<Autosuggest
			{...autosuggestProps}
			inputProps={{
				classes,
				placeholder: 'Cerca un dipendente...',
				value: selectedPerson,
				onChange: (event, { newValue }) => setSelectedPerson(newValue),
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

export default withStyles(styles)(AddEmployeeAutocomplete);

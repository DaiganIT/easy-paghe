import React, { useState } from 'react';
import Downshift from 'downshift';
import { withStyles, TextField, Paper, MenuItem, InputAdornment, CircularProgress } from '@material-ui/core';

const styles = (theme) => ({
	container: {
		position: 'relative',
	},
	inputRoot: {
		flexWrap: 'wrap',
	},
	inputInput: {
		width: 'auto',
		flexGrow: 1,
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 100,
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
	progress: {
		width: '20px !important',
		height: '20px !important'
	}
});

function Autocomplete({ id, label, error, disabled, required, placeholder, classes, onSuggestionSelected, suggestions, loadSuggestions, isLoading, suggestionAccessor }) {
	const [isOpen, setIsOpen] = useState(false);
	return <Downshift 
		onChange={(suggestion) => { setIsOpen(false); onSuggestionSelected(suggestion);}} 
		itemToString={item => item ? suggestionAccessor(item) : ''}
		isOpen={isOpen}
		onOuterClick={() => setIsOpen(false)}
		onInputValueChange={(inputValue) => loadSuggestions({ search: inputValue })}
		>
		{({
			getInputProps,
			getItemProps,
			getMenuProps,
			isOpen,
			highlightedIndex,
			selectedItem,
		}) =>
			<div className={classes.container}>
				{renderInput({
					id, label, error, disabled, required,
          fullWidth: true,
					classes,
					InputProps: getInputProps({
						placeholder: placeholder,
						onFocus: e => setIsOpen(true),
						endAdornment: isLoading ? <InputAdornment><CircularProgress className={classes.progress} /></InputAdornment> : null,
					}),
				})}
				<div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.suggestionsContainerOpen} square>
                  {suggestions.items.map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ key: suggestion.id, item: suggestion }),
                      highlightedIndex,
											selectedItem,
											suggestionAccessor
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
			</div>}
	</Downshift>;
}

function renderInput(inputProps) {
	const { InputProps, classes, ref, ...other } = inputProps;

	return (
		<TextField
			variant="outlined"
			InputProps={{
				inputRef: ref,
				classes: {
					root: classes.inputRoot,
					input: classes.inputInput,
				},
				...InputProps,
			}}
			{...other}
		/>
	);
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem, suggestionAccessor }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem ? selectedItem.id === suggestion.id : false;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestionAccessor(suggestion)}
    </MenuItem>
  );
}

export default withStyles(styles)(Autocomplete);

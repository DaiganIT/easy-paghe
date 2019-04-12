import React from 'react';
import { withStyles, TextField } from '@material-ui/core';

const styles = {
	right: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
};

function SearchField({ classes, search, setSearch }) {
	return (
		<div className={classes.right}>
			<TextField
				id="search-box"
				label="Cerca..."
				className={classes.textField}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	);
}

export default withStyles(styles)(SearchField);

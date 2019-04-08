import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';

const styles = {
	summaryText: {
		alignSelf: 'flex-end',
	}
}

function SummaryItem({ classes, name, value }) {
	return <Grid container justify="space-between">
		<Grid item xs={6}>
			<Typography variant="subtitle1">
				{name}:
			</Typography>
		</Grid>
		<Grid item xs={6} className={classes.summaryText}>
			<Typography align="right">
				{value}
			</Typography>
		</Grid>
	</Grid>;
}

export default withStyles(styles)(SummaryItem);
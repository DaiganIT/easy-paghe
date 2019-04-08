import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';

const styles = {
	summaryText: {
		alignSelf: 'flex-end',
	}
}

function SummaryItem({ classes, name, value, errors }) {
	return <Grid container justify="space-between">
		<Grid item xs={6}>
			<Typography variant="subtitle1" color={!!errors ? 'error' : 'default' }>
				{name}:
			</Typography>
		</Grid>
		<Grid item xs={6} className={classes.summaryText}>
			<Typography align="right">
				{value}
			</Typography>
		</Grid>
		{!!errors
			? <Grid item xs={12}>
				{errors.map((err, index) => <Typography key={index} color="error">{err}</Typography>)}
			</Grid>
			: null}
	</Grid>;
}

export default withStyles(styles)(SummaryItem);
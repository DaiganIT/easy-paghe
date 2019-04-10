import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = {
	menu: {
		display: 'flex',
		marginBottom: '1em',
	},
	paper: {
		padding: '1em',
	},
	grow: {
		flexGrow: 1,
	},
};

function Page({ classes, title, noPaper, menuComponent, children }) {
	return (
		<div>
			<span id="page-title" className={classes.menu}>
				<Typography variant="title" className={classes.grow}>
					{title}
				</Typography>
				{menuComponent}
			</span>
			{noPaper ? <span>{ children }</span> : <Paper className={classes.paper}>{children}</Paper>}
		</div>
	);
}

export default withStyles(styles)(Page);

import React from 'react';
import classNames from 'classnames';
import { withStyles, Button, CircularProgress } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const styles = {
	buttonProgress: {
		color: green[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
};

function ButtonWithLoader({ classes, isLoading, ...props }) {
	const buttonClassname = classNames({
		[classes.buttonSuccess]: isLoading,
		[props.className]: true,
	});

	return (
		<div>
			<Button {...props} className={buttonClassname} disabled={isLoading}>
				Salva
        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
			</Button>
		</div>
	);
}

export default withStyles(styles)(ButtonWithLoader);

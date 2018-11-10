import React from 'react';
import { withStyles, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

function Notification({ classes, open, message, onClose }) {
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			open={open}
			autoHideDuration={5000}
			onClose={onClose}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			message={<span id="message-id">{message}</span>}
			action={[
				<IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={onClose}>
					<CloseIcon />
				</IconButton>,
			]}
		/>
	);
}

export default withStyles(styles)(Notification);
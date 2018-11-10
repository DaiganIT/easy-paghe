import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

function ConfirmDialog({ id, open, title, onConfirm, onClose, children }) {
	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="simple-dialog-title">
			<DialogTitle id={`dialog-${id}`}>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{children}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Annulla
				</Button>
				<Button onClick={onConfirm} color="primary" autoFocus>
					Conferma
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmDialog;

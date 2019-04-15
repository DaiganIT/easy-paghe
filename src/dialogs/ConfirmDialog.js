import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

function ConfirmDialog({ id, open, title, onConfirm, onClose, children }) {
	return (
		<Dialog id={`dialog-${id}`} open={open} onClose={onClose} aria-labelledby="simple-dialog-title">
			<DialogTitle id={`dialog-${id}-title`}>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id={`dialog-${id}-description`}>{children}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button id={`dialog-${id}-cancel-button`} onClick={onClose} color="primary">
					Annulla
				</Button>
				<Button id={`dialog-${id}-confirm-button`} onClick={onConfirm} color="primary" autoFocus>
					Conferma
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmDialog;

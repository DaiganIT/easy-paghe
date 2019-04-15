import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

function ChoiceDialog({ id, open, title, onClose, children, choices }) {
	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="simple-dialog-title">
			<DialogTitle id={`dialog-${id}`}>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{children}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{choices.map((choice, index) =>
					<Button key={index} onClick={choice.action} color="primary" autoFocus={choice.autoFocus}>
						{choice.text}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
}

export default ChoiceDialog;

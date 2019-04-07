import React from 'react';
import {
	withStyles,
	TextField,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Typography,
	IconButton
} from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';

const styles = theme => ({
	paper: {
		padding: '1em',
		marginBottom: '1em',
		position: 'relative'
	},
	miniTitle: {
		marginBottom: '1em',
	},
	hash: {
		textAlign: 'center',
	},
	fab: {
		marginBottom: '1em'
	},
	addBase: {
		cursor: 'pointer'
	},
	colPadding: {
		border: 0,
		padding: '10px'
	}
});

function CompanyBases({ classes, bases, addBase, deleteBase, isSaving, updateBaseField }) {
	return (
		<React.Fragment>
			<Table>
				<TableBody>
					{bases.map((base, index) => (
						<TableRow key={base.id || index}>
							<TableCell className={classes.colPadding} >
								<TextField
									variant="outlined"
									label="Nome"
									fullWidth
									className={classes.textField}
									disabled={isSaving}
									value={base.name}
									onChange={(e) => updateBaseField('name', index, e.target.value)}
								/></TableCell>
							<TableCell className={classes.colPadding}>
								<TextField
									variant="outlined"
									label="Indirizzo"
									fullWidth
									className={classes.textField}
									disabled={isSaving}
									value={base.address}
									onChange={(e) => updateBaseField('address', index, e.target.value)}
								/>
							</TableCell>
							<TableCell component="th" scope="row" padding="checkbox" className={classes.deleteClass} className={classes.colPadding}>
								<IconButton onClick={() => deleteBase(index)}>
									<Delete color="secondary" />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
					<TableRow hover>
						<TableCell component="th" scope="row" colSpan={3} onClick={addBase} align="center" className={classes.addBase}>
							<Typography><Add color="secondary" /> Aggiungi sede</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</React.Fragment>
	);
}

export default withStyles(styles)(CompanyBases);

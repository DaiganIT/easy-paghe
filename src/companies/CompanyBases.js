import React from 'react';
import classnames from 'classnames';
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

function CompanyBases({ classes, bases, addBase, deleteBase, isSaving, updateBaseField, errors }) {
	return (
		<React.Fragment>
			<Table>
				<TableBody>
					{bases.map((base, index) => (
						<TableRow key={base.id || index}>
							<TableCell className={classes.colPadding} >
								<TextField
									id={`company-base-${index}-name`}
									required
									error={!!errors.bases && !!errors.bases[index] && !!errors.bases[index].name}
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
									id={`company-base-${index}-address`}
									error={!!errors.bases && !!errors.bases[index] && !!errors.bases[index].address}
									variant="outlined"
									label="Indirizzo"
									fullWidth
									className={classes.textField}
									disabled={isSaving}
									value={base.address}
									onChange={(e) => updateBaseField('address', index, e.target.value)}
								/>
							</TableCell>
							<TableCell component="th" scope="row" padding="checkbox" className={classnames(classes.deleteClass, classes.colPadding)} align="right">
								{index > 0
									? <IconButton id={`company-base-${index}-delete`} onClick={() => deleteBase({ baseId: base.id, index })}>
										<Delete color="secondary" />
									</IconButton>
									: null}
							</TableCell>
						</TableRow>
					))}
					<TableRow hover>
						<TableCell component="th" scope="row" colSpan={3} onClick={addBase} align="center" className={classes.addBase}>
							<Typography id="add-company-button"><Add color="secondary" /> Aggiungi sede</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</React.Fragment>
	);
}

export default withStyles(styles)(CompanyBases);

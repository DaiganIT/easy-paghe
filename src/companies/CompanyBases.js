import React from 'react';
import {
	withStyles,
	Typography,
	Paper,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	Button,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

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
		position: 'absolute',
    top: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
  },
});

function CompanyBases({ classes, bases, selectBase, addBase, deleteBase, selectedBaseIndex }) {
	return (
		<React.Fragment>
			<Paper className={classes.paper}>
				<Typography variant="title" className={classes.miniTitle}>
					Sedi
				</Typography>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox" className={classes.hash}>
								#
							</TableCell>
							<TableCell>Nome</TableCell>
							<TableCell>Indirizzo</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{bases.map((base, index) => (
							<TableRow hover key={base.id || index} onClick={() => selectBase(index)} selected={index === selectedBaseIndex}>
								<TableCell component="th" scope="row" padding="checkbox">
									<IconButton onClick={() => deleteBase(index)}>
										<Delete color="secondary" />
									</IconButton>
								</TableCell>
								<TableCell>{base.name}</TableCell>
								<TableCell>{base.address}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Button variant="contained" size="small" color="primary" className={classes.fab} onClick={addBase}>
					Aggiungi Sede
				</Button>
			</Paper>
		</React.Fragment>
	);
}

export default withStyles(styles)(CompanyBases);

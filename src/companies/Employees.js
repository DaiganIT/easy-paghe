import React from 'react';
import { withStyles, Typography, Paper, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';

const styles = {
	paper: {
		padding: '1em',
		marginBottom: '1em',
	},
	miniTitle: {
		marginBottom: '1em',
	},
};

function Employees({ classes, employees, setEmployees }) {
	return (
		<Paper className={classes.paper}>
			<Typography variant="title" className={classes.miniTitle}>
				Dipendenti
			</Typography>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell>
						<TableCell>Indirizzo</TableCell>
						<TableCell>Telefono</TableCell>
						<TableCell>Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{employees.map((employee) => (
						<TableRow key={employee.id}>
							<TableCell component="th" scope="row">
								{employee.name}
							</TableCell>
							<TableCell>{employee.address}</TableCell>
							<TableCell>{employee.phone}</TableCell>
							<TableCell>{employee.email}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}

export default withStyles(styles)(Employees);

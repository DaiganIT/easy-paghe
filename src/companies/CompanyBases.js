import React, { useState, useEffect } from 'react';
import {
	withStyles,
	Typography,
	Paper,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	LinearProgress,
} from '@material-ui/core';
import AddEmployeeAutocomplete from './AddEmployeeAutocomplete';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import http from './http';
import useConfirmDialog from '../dialogs/useConfirmDialog';
import ConfirmDialog from '../dialogs/ConfirmDialog';

const styles = {
	paper: {
		padding: '1em',
		marginBottom: '1em',
	},
	miniTitle: {
		marginBottom: '1em',
	},
	pointer: {
		cursor: 'pointer',
	},
	hash: {
		textAlign: 'center',
	},
};

function Employees({ classes, companyId }) {
	const [loadEmployees, setLoadEmployees] = useState(false);
	const [addingEmployee, setAddingEmployee] = useState(false);
	const [removingEmployee, setRemovingEmployee] = useState(false);
	const [employees, setEmployees] = useState({ items: [], length: 0 });
	const [people, setPeople] = useState({ items: [], length: 0 });
	const [lastSelected, setLastSelected] = useState();
	const [selectedPerson, setSelectedPerson] = useState('');
	const [selectedForRemoval, setSelectedForRemoval] = useState();

	const onDeleteConfirm = () => {
		setRemovingEmployee(true);
	};

	const { isDialogOpen, openDialog, closeDialog, confirmDialog } = useConfirmDialog({
		confirmAction: onDeleteConfirm,
	});

	useEffect(
		() => {
			if (loadEmployees) {
				const [promise, tokenSource] = http.loadEmployees({ companyId, search: '', page: 0, pageLimit: 10 });
				promise.then(({ data }) => {
					setEmployees(data);
					setLoadEmployees(false);
				});
				return function cleanup() {
					if (loadEmployees) tokenSource.cancel();
				};
			}
		},
		[loadEmployees],
	);

	useEffect(
		() => {
			if (addingEmployee) {
				const [promise, tokenSource] = http.addEmployee({ companyId, personId: lastSelected.id });
				promise.then(() => {
					// reload employees
					setLoadEmployees(true);
					setAddingEmployee(false);
				});
			}
		},
		[addingEmployee],
	);

	useEffect(
		() => {
			if (removingEmployee) {
				const [promise, tokenSource] = http.removeEmployee({ companyId, personId: selectedForRemoval.id });
				promise.then(() => {
					// reload employees
					setLoadEmployees(true);
					setRemovingEmployee(false);
					setSelectedForRemoval();
				});
			}
		},
		[removingEmployee],
	);

	useEffect(() => {
		setLoadEmployees(true);
	}, []);

	const handleSuggestionSelected = ({ suggestion }) => {
		setAddingEmployee(true);
		setLastSelected(suggestion);
	};

	const remove = employee => () => {
		setSelectedForRemoval(employee);
		openDialog();
	}

	return (
		<div>
			<Paper className={classes.paper}>
				<Typography variant="title" className={classes.miniTitle}>
					Aggiungi Dipendente
				</Typography>
				<AddEmployeeAutocomplete
					people={people}
					setPeople={setPeople}
					selectedPerson={selectedPerson}
					setSelectedPerson={setSelectedPerson}
					handleSuggestionSelected={handleSuggestionSelected}
				/>
			</Paper>
			<Paper className={classes.paper}>
				{loadEmployees ? <LinearProgress /> : undefined}
				<Typography variant="title" className={classes.miniTitle}>
					Dipendenti
				</Typography>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox" className={classes.hash}>
								#
							</TableCell>
							<TableCell>Nome</TableCell>
							<TableCell>Indirizzo</TableCell>
							<TableCell>Telefono</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{employees.items.map((employee) => (
							<TableRow hover key={employee.id}>
								<TableCell component="th" scope="row" padding="checkbox">
									<IconButton onClick={remove(employee)}>
										<DeleteIcon color="secondary" />
									</IconButton>
								</TableCell>
								<TableCell>{employee.name}</TableCell>
								<TableCell>{employee.address}</TableCell>
								<TableCell>{employee.phone}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
			<ConfirmDialog
				open={isDialogOpen}
				id="remove-employee"
				onClose={closeDialog}
				onConfirm={confirmDialog}
				title="Rimuovere dipendente?"
			>
				L'eliminazione non puo' essere annullata. Sei sicuro?
			</ConfirmDialog>
		</div>
	);
}

export default withStyles(styles)(Employees);

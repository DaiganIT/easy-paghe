import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles, IconButton, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Button } from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';
import http from './http';
import useList from '../commonHooks/useList';
import Page from '../common/Page';
import SearchField from '../common/SearchField';
import useConfirmDialog from '../dialogs/useConfirmDialog';
import useDeleteable from '../commonHooks/useDeleteable';
import ConfirmDialog from '../dialogs/ConfirmDialog';

const styles = {
	link: {
		textDecoration: 'none',
	},
	pointer: {
		cursor: 'pointer',
	},
};

function People({ classes, history }) {
	const { data, loadData, reloadData, search, setSearch, page, setPage, pageLimit } = useList({ getPromise: http.getPeople });

	const onDelete = () => {
		reloadData();
	}

	const deletePerson = (options) => http.deletePerson(options.personId);
	const [isDeleting, setIsDeleting] = useDeleteable({ deletePromise: deletePerson, onDelete });
	const [isDeletePersonDialogOpen, openDeletePersonDialog, closeDeletePersonDialog, closeDeletePersonConfirm] = useConfirmDialog({ confirmAction: (options) => setIsDeleting(options) });

	const navigateTo = (personId) => {
		history.push(`/index/people/${personId}`);
	};

	const addButton = (
		<Link to="/index/people/add" className={classes.link}>
			<Button id="add-person-button" variant="contained" color="primary" size="small">
				<Add />
				Nuova Persona
			</Button>
		</Link>
	);

	return (
		<Page title="Gestione Persone" menuComponent={addButton}>
			{loadData ? <LinearProgress id="loader-people" /> : undefined}
			<SearchField value={search} setSearch={setSearch} />
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell>
						<TableCell>Indirizzo</TableCell>
						<TableCell>Telefono</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.items.map((person) => (
						<TableRow
							hover
							key={person.id}
							className={classes.pointer}
						>
							<TableCell onClick={() => navigateTo(person.id)}>
								{person.firstName} {person.lastName}
							</TableCell>
							<TableCell onClick={() => navigateTo(person.id)}>{person.address}</TableCell>
							<TableCell onClick={() => navigateTo(person.id)}>{person.phone}</TableCell>
							<TableCell padding="checkbox" className={classnames(classes.deleteClass, classes.colPadding)} align="right">
								<IconButton onClick={() => openDeletePersonDialog({ personId: person.id })} disabled={isDeleting}>
									<Delete color="secondary" />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				component="div"
				count={data.length}
				rowsPerPage={pageLimit}
				rowsPerPageOptions={[]}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Pagina Precedente',
					'id': 'page-back-button'
				}}
				nextIconButtonProps={{
					'aria-label': 'Pagina Successiva',
					'id': 'page-next-button'
				}}
				onChangePage={(event, page) => {
					setPage(page);
				}}
			/>

			<ConfirmDialog
				open={isDeletePersonDialogOpen}
				id="delete-person"
				onClose={closeDeletePersonDialog}
				onConfirm={closeDeletePersonConfirm}
				title="Eliminare questa persona?"
			>
				Sei sicuro di volere eliminare questa persona?
			</ConfirmDialog>

		</Page>
	);
}

export default withStyles(styles)(People);

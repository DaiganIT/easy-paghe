import React from 'react';
import debounce from 'debounce-promise';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import http from './http';
import useList from '../commonHooks/useList';
import Page from '../common/Page';
import SearchField from '../common/SearchField';

const styles = {
	link: {
		textDecoration: 'none',
	},
	pointer: {
		cursor: 'pointer',
	},
};

const debouncedGetPromise = debounce(http.getPeople, 300);

function People({ classes, history }) {
	const { data, loadData, search, setSearch, page, setPage, pageLimit } = useList({ getPromise: debouncedGetPromise });

	const navigateTo = (personId) => {
		history.push(`/index/people/${personId}`);
	};

	const addButton = (
		<Link to="/index/people/add" className={classes.link}>
			<Button variant="contained" color="primary" size="small">
				<AddIcon />
				Nuova Persona
			</Button>
		</Link>
	);

	return (
		<Page title="Gestione Persone" menuComponent={addButton}>
			{loadData ? <LinearProgress /> : undefined}
			<SearchField value={search} setSearch={setSearch} />
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell>
						<TableCell>Indirizzo</TableCell>
						<TableCell>Telefono</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.items.map((person) => (
						<TableRow
							hover
							key={person.id}
							className={classes.pointer}
							onClick={() => navigateTo(person.id)}
						>
							<TableCell component="th" scope="row">
								{person.name}
							</TableCell>
							<TableCell>{person.address}</TableCell>
							<TableCell>{person.phone}</TableCell>
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
				}}
				nextIconButtonProps={{
					'aria-label': 'Pagina Successiva',
				}}
				onChangePage={(event, page) => {
					setPage(page);
				}}
			/>
		</Page>
	);
}

export default withStyles(styles)(People);

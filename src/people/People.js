import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import http from './http';
import useList from '../commonHooks/useList';
import Page from '../common/Page';

const styles = {
	link: {
		textDecoration: 'none',
	},
	pointer: {
		cursor: 'pointer',
	},
};

function People({ classes, history }) {
	const { data, loadData } = useList(http.getPeople);

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
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell>
						<TableCell>Indirizzo</TableCell>
						<TableCell>Telefono</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((person) => (
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
		</Page>
	);
}

export default withStyles(styles)(People);

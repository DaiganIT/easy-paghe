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

function Companies({ classes, history }) {
	const { data, loadData } = useList({ getPromise: http.getCompanies });

	const navigateTo = (companyId) => {
		history.push(`/index/companies/${companyId}`);
	};

	const menuButton = (
		<Link to="/index/companies/add" className={classes.link}>
			<Button variant="contained" color="primary" size="small">
				<AddIcon />
				Nuova azienda
			</Button>
		</Link>
	);

	return (
		<Page title="Gestione Aziende" menuComponent={menuButton}>
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
					{data.map((company) => (
						<TableRow
							hover
							key={company.id}
							className={classes.pointer}
							onClick={() => navigateTo(company.id)}
						>
							<TableCell component="th" scope="row">
								{company.name}
							</TableCell>
							<TableCell>{company.address}</TableCell>
							<TableCell>{company.phone}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Page>
	);
}

export default withStyles(styles)(Companies);

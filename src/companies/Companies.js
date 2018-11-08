import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import http from './http';
import axios from 'axios';

const styles = {
	menu: {
		display: 'flex',
		marginBottom: '1em',
	},
	paper: {
		padding: '1em',
	},
	grow: {
		flexGrow: 1,
	},
	link: {
		textDecoration: 'none',
	},
	pointer: {
		cursor: 'pointer',
	},
};

function Companies({ classes, history }) {
	const [companies, setCompanies] = useState([]);
	const [loadCompanies, setLoadCompanies] = useState(false);

	useEffect(
		() => {
			if (loadCompanies) {
				const { promise, tokenSource } = http.getCompanies();
				promise
					.then(({ data }) => {
						setLoadCompanies(false);
						setCompanies(data);
					})
					.catch((error) => {
						if (!axios.isCancel(error)) {
							setLoadCompanies(false);
						}
					});

				return function cleanup() {
					if (setLoadCompanies) tokenSource.cancel();
				};
			}
		},
		[loadCompanies],
	);

	useEffect(() => {
		setLoadCompanies(true);
	}, []);

	const navigateTo = (companyId) => {
		history.push(`/index/companies/${companyId}`);
	};

	return (
		<div>
			<span className={classes.menu}>
				<Typography variant="title" className={classes.grow}>
					Gestione Aziende
				</Typography>
				<Link to="/index/companies/add" className={classes.link}>
					<Button variant="contained" color="primary" size="small">
						<AddIcon />
						Nuova azienda
					</Button>
				</Link>
			</span>
			<Paper className={classes.paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Nome</TableCell>
							<TableCell>Indirizzo</TableCell>
							<TableCell>Telefono</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{companies.map((company) => (
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
			</Paper>
		</div>
	);
}

export default withStyles(styles)(Companies);

import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
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

function Hired({ classes, history }) {
	const { data, loadData, search, setSearch, page, setPage, pageLimit } = useList({ getPromise: http.getHired });

	const navigateTo = (hireId) => {
		history.push(`/index/hired/${hireId}`);
	};

	const addButton = (
		<Link to="/index/hired/hire" className={classes.link}>
			<Button id="hire-person-button" variant="contained" color="primary" size="small">
				<Add />
				Nuova Assunzione
			</Button>
		</Link>
	);

	return (
		<Page title="Gestione Assunzioni" menuComponent={addButton}>
			{loadData ? <LinearProgress id="loader-hired-people" /> : undefined}
			<SearchField value={search} setSearch={setSearch} />
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Azienda</TableCell>
						<TableCell>Nome</TableCell>
						<TableCell>Data Assunzione</TableCell>
						<TableCell>CCNL</TableCell>
						<TableCell>Livello</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.items.map((hired) => (
						<TableRow
							hover
							key={hired.id}
							className={classes.pointer}
						>
							<TableCell onClick={() => navigateTo(hired.id)}>{hired.companyBase.company.name}</TableCell>
							<TableCell onClick={() => navigateTo(hired.id)}>{hired.person.firstName} {hired.person.lastName}</TableCell>
							<TableCell onClick={() => navigateTo(hired.id)}>{hired.startDate.format()}</TableCell>
							<TableCell onClick={() => navigateTo(hired.id)}>{hired.ccnl.name}</TableCell>
							<TableCell onClick={() => navigateTo(hired.id)}>{hired.salaryTable.level}</TableCell>
							<TableCell padding="checkbox" className={classnames(classes.deleteClass, classes.colPadding)} align="right">
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
		</Page>
	);
}

export default withStyles(styles)(Hired);

import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles, LinearProgress, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
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
import { buildDeleteCompanyChoices } from './deleteCompanyChoices';
import useChoiceDialog from '../dialogs/useChoiceDialog';
import useConfirmDialog from '../dialogs/useConfirmDialog';
import useDeleteable from '../commonHooks/useDeleteable';
import ChoiceDialog from '../dialogs/ChoiceDialog';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import { companyHasEmployees } from './utils';

const styles = {
	link: {
		textDecoration: 'none',
	},
	pointer: {
		cursor: 'pointer',
	}
};

function CompaniesWrapper({ classes, history }) {
	const { data, loadData, reloadData, search, setSearch, page, setPage, pageLimit } = useList({ getPromise: http.getCompanies });

	const onDelete = () => {
		reloadData();
	}

	const deleteCompany = (options) => http.deleteCompany(options.companyId, options.withEmployees);
	const [isDeleting, setIsDeleting] = useDeleteable({ deletePromise: deleteCompany, onDelete });
	const [isDeleteCompanyChoiceDialogOpen, openDeleteCompanyChoiceDialog, closeDeleteCompanyChoiceDialog] = useChoiceDialog({ choices: deleteCompanyChoices });
	const [isDeleteCompanyDialogOpen, openDeleteCompanyDialog, closeDeleteCompanyDialog, closeDeleteCompanyConfirm] = useConfirmDialog({ confirmAction: (options) => setIsDeleting(options) });

	const onDeleteCompany = ({ company }) => {
		companyHasEmployees(company) ? openDeleteCompanyChoiceDialog({ companyId: company.id }) : openDeleteCompanyDialog({ companyId: company.id })
	}

	const props = {
		data, loadData, search, setSearch, page, setPage, pageLimit, history, classes, setIsDeleting,
		onDeleteCompany, isDeleting, isDeleteCompanyChoiceDialogOpen, closeDeleteCompanyChoiceDialog,
		isDeleteCompanyDialogOpen, closeDeleteCompanyDialog, closeDeleteCompanyConfirm
	}

	return <Companies {...props} />
}

export function Companies({
	data, loadData, search, setSearch, page, setPage, pageLimit, history, classes, setIsDeleting,
	onDeleteCompany, isDeleting, isDeleteCompanyChoiceDialogOpen, closeDeleteCompanyChoiceDialog,
	isDeleteCompanyDialogOpen, closeDeleteCompanyDialog, closeDeleteCompanyConfirm
}) {
	const deleteCompanyChoices = buildDeleteCompanyChoices({ setIsDeleting });

	const navigateTo = (companyId) => {
		history.push(`/index/companies/${companyId}`);
	};

	const menuButton = (
		<Link to="/index/companies/add" className={classes.link}>
			<Button id="add-company-button" variant="contained" color="primary" size="small">
				<AddIcon />
				Nuova azienda
			</Button>
		</Link>
	);

	return (
		<Page title="Gestione Aziende" menuComponent={menuButton}>
			{loadData ? <LinearProgress id="loader-companies" /> : undefined}
			<SearchField value={search} setSearch={setSearch} />
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell>
						<TableCell>Codice Fiscale</TableCell>
						<TableCell>Partita IVA</TableCell>
						<TableCell>Codice INPS</TableCell>
						<TableCell>Codice INAIL</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.items.map(company => (
						<TableRow
							hover
							key={company.id}
							className={classes.pointer}
						>
							<TableCell scope="row" onClick={() => navigateTo(company.id)}>
								{company.name}
							</TableCell>
							<TableCell onClick={() => navigateTo(company.id)}>{company.fiscalCode}</TableCell>
							<TableCell onClick={() => navigateTo(company.id)}>{company.ivaCode}</TableCell>
							<TableCell onClick={() => navigateTo(company.id)}>{company.inpsRegistrationNumber}</TableCell>
							<TableCell onClick={() => navigateTo(company.id)}>{company.inailRegistrationNumber}</TableCell>
							<TableCell padding="checkbox" className={classnames(classes.deleteClass, classes.colPadding)} align="right">
								<IconButton onClick={() => onDeleteCompany({ company })} disabled={isDeleting}>
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
				onChangePage={(event, page) => { setPage(page) }}
			/>

			<ConfirmDialog
				open={isDeleteCompanyDialogOpen}
				id="delete-company"
				onClose={closeDeleteCompanyDialog}
				title="Eliminare questa azienda?"
				onConfirm={closeDeleteCompanyConfirm}>
				Sei sicuro di voler eliminare questa azienda?
			</ConfirmDialog>

			<ChoiceDialog
				open={isDeleteCompanyChoiceDialogOpen}
				id="delete-company-with-employees"
				onClose={closeDeleteCompanyChoiceDialog}
				title="Eliminare questa azienda?"
				choices={deleteCompanyChoices}
			>
				L'azienda ha dipendenti assunti, cosa vuoi fare con loro?
			</ChoiceDialog>
		</Page>
	);
}

export default withStyles(styles)(CompaniesWrapper);

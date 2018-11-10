import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';
import LeftDrawer from './LeftDrawer';
import Dashboard from '../dashboard/Dashboard';
import Companies from '../companies/Companies';
import AddCompany from '../companies/AddCompany';
import EditCompany from '../companies/EditCompany';
import People from '../people/People';
import AddPerson from '../people/AddPerson';
import EditPerson from '../people/EditPerson';
import GlobalNotification from '../common/GlobalNotification';
import authentication from '../auth/auth';

const styles = (theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
});

function LoggedInLayout({ classes, history }) {
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(true);

	useEffect(
		() => {
			if (isLoggingOut) {
				authentication.logout().then(() => {
					setIsLoggingOut(false);
					history.push('/index');
				});
			}
		},
		[isLoggingOut],
	);

	return (
		<div className={classes.root}>
			<TopBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} setIsLoggingOut={setIsLoggingOut} />
			<LeftDrawer drawerOpen={drawerOpen} />
			<main className={classes.content}>
				<GlobalNotification />
				<div className={classes.toolbar} />
				<Route exact path="/index" component={Dashboard} />
				<Route exact path="/index/companies" component={Companies} />
				<Route exact path="/index/companies/add" component={AddCompany} />
				<Route exact path="/index/companies/:companyId(\d*)" component={EditCompany} />
				<Route exact path="/index/people" component={People} />
				<Route exact path="/index/people/add" component={AddPerson} />
				<Route exact path="/index/people/:personId(\d*)" component={EditPerson} />
			</main>
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(LoggedInLayout);

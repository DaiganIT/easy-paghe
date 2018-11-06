import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 240;

const styles = (theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	margin: {
		marginTop: '4em',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9 + 1,
		},
	},
});

function LeftDrawer({ classes, theme, drawerOpen, setDrawerOpen }) {
	return (
		<Drawer
			variant="permanent"
			className={classNames(classes.drawer, {
				[classes.drawerOpen]: drawerOpen,
				[classes.drawerClose]: !drawerOpen,
			})}
			classes={{
				paper: classNames({
					[classes.drawerOpen]: drawerOpen,
					[classes.drawerClose]: !drawerOpen,
				}),
			}}
			open={drawerOpen}
		>
			<div className={classes.margin} />
			<Divider />
			<List>
				<ListItem button key="companies">
					<ListItemIcon>
						<BusinessIcon />
					</ListItemIcon>
					<ListItemText primary="Aziende" />
				</ListItem>
				<ListItem button key="people">
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Persone" />
				</ListItem>
			</List>
			<Divider />
			<ListItem button key="users">
				<ListItemIcon>
					<AccountCircleIcon />
				</ListItemIcon>
				<ListItemText primary="Utenti" />
			</ListItem>
		</Drawer>
	);
}

export default withStyles(styles, { withTheme: true })(LeftDrawer);

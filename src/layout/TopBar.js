import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	grow: {
		flexGrow: 1,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	logoutButton: {
		marginRight: '1em',
	},
});

function TopBar({ classes, drawerOpen, setDrawerOpen, setIsLoggingOut }) {
	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar disableGutters={true}>
				<IconButton
					color="inherit"
					aria-label="Open drawer"
					onClick={toggleDrawer}
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" color="inherit" noWrap className={classes.grow}>
					Easy Paghe
				</Typography>
				<Button
					variant="contained"
					color="secondary"
					onClick={setIsLoggingOut}
					className={classes.logoutButton}
				>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
}

export default withStyles(styles, { withTheme: true })(TopBar);

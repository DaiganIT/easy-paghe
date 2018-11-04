import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Login } from './';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import logo from '../images/logo.png';

const styles = (theme) => ({
	main: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		alignItems: 'center',
		justifyContent: 'flex-start',
		background: 'url(https://source.unsplash.com/random/1600x900)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	},
	card: {
		minWidth: 300,
		width: 300,
		marginTop: '6em',
	},
	image: {
		width: '100%',
	},
	form: {
		padding: '0 1em 1em 1em',
	},
});

function LoginPage({ classes }) {
	return (
		<div className={classes.main}>
			<Card className={classes.card}>
				<form>
					<div className={classes.form}>
						<Login />
					</div>
					<CardActions className={classes.actions}>
						<Button variant="raised" type="submit" color="primary" fullWidth>
							{/* {isLoading && <CircularProgress size={25} thickness={2} />} */}
							Login
						</Button>
					</CardActions>
				</form>
			</Card>
		</div>
	);
}

LoginPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);

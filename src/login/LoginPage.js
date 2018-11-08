import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Login } from './';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import authentication from '../auth/auth';

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
	title: {
		textAlign: 'center',
		marginTop: '1em',
	},
	actions: {
		marginBottom: '1em',
	},
});

function LoginPage({ classes, history }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const doLogin = () => {
		setIsLoading(true);
	};

	useEffect(
		() => {
			if (isLoading) {
				// do login
				setEmailError(false);
				setPasswordError(false);

				authentication
					.login(email, password)
					.then(() => {
						setIsLoading(false);
						history.push('/index');
					})
					.catch(({ response }) => {
						setIsLoading(false);

						if (response.status === 400) {
							// check the error code
							const errorCode = response.data.message;
							if (errorCode === 'USERNAME_MISSING') setEmailError(true);
							if (errorCode === 'PASSWORD_MISSING') setPasswordError(true);
							if (errorCode === 'INVALID_CREDENTIALS') {
								setEmailError(true);
								setPasswordError(true);
							}
						}
					});
			}
		},
		[isLoading],
	);

	if (authentication.isAuthenticated)
		return <Redirect to="/index" />

	return (
		<div className={classes.main}>
			<Card className={classes.card}>
				<form>
					<div className={classes.form}>
						<div className={classes.title}>
							<Typography variant="h4">Easy Paghe</Typography>
						</div>
						<Login
							email={email}
							emailError={emailError}
							password={password}
							passwordError={passwordError}
							setEmail={setEmail}
							setPassword={setPassword}
							isLoading={isLoading}
						/>
					</div>
					<CardActions className={classes.actions}>
						<Button variant="contained" type="button" color="primary" fullWidth onClick={doLogin}>
							{isLoading && <CircularProgress size={25} thickness={2} />}
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

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const styles = {
	input: {
		marginTop: '1em',
	},
};

function Login({ classes, email, emailError, password, passwordError, setEmail, setPassword, isLoading }) {
	return (
		<React.Fragment>
			<TextField
				error={emailError}
				id="email-textfield-id"
				label="Email"
				value={email}
				className={classes.input}
				disabled={isLoading}
				onChange={(e) => setEmail(e.target.value)}
				fullWidth
			/>
			<FormControl fullWidth className={classes.input} disabled={isLoading} error={passwordError}>
				<InputLabel htmlFor="password-textfield-id">Password</InputLabel>
				<Input
					id="password-textfield-id"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</FormControl>
		</React.Fragment>
	);
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	setEmail: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Login);

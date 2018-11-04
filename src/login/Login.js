import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
	input: {
		marginTop: '1em',
	},
});

function Login({ classes }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<React.Fragment>
			<TextField
				id="email-textfield-id"
				label="Email"
				value={email}
				className={classes.input}
				onChange={(e) => setEmail(e.target.value)}
				fullWidth
			/>
			<FormControl fullWidth className={classes.input}>
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
};

export default withStyles(styles)(Login);

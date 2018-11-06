import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import authentication from './auth/auth';

function LoggedInLayout({ history }) {
	const [isLoggingOut, setIsLoggingOut] = useState(false);

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

	const logout = () => {
		setIsLoggingOut(true);
	};

	return (
		<div>
			<Button variant="contained" type="button" color="primary" fullWidth onClick={logout}>
				Logout
			</Button>
			LoggedInLayout
		</div>
	);
}

export default LoggedInLayout;

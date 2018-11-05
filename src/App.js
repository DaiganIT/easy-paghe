import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { LoginPage } from './login';
import authentication from './auth/auth';
import LoggedInLayout from './LoggedInLayout';

function App() {
	return (
		<React.Fragment>
			<CssBaseline />
			<Route path="/login" exact component={LoginPage} />
			<Route
				path="/index"
				render={() =>
					authentication.isAuthenticated ? (
						<LoggedInLayout />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								//state: { from: props.location },
							}}
						/>
					)
				}
			/>
			<Route
				path="/"
				exact
				render={() => (
					<Redirect
						to={{
							pathname: '/login',
							//state: { from: props.location },
						}}
					/>
				)}
			/>
		</React.Fragment>
	);
}

export default App;

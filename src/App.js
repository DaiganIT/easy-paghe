import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { LoginPage } from './login';

function App() {
	return <React.Fragment>
			<CssBaseline />
			<LoginPage />
		</React.Fragment>;
}

export default App;

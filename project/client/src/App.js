import React from 'react';
import './App.css';
//import { Router, Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginComponent from './features/auth/loginComponent';
import { getIsLogged } from './features/auth/authSlice';
import MyRoutes from './features/sidebar/routes';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, fab, far);

function App() {
	const loggedIn = useSelector(getIsLogged);
	let fullApp;
	if (loggedIn) {
		fullApp = (
			<div className='overflow-hidden p-2 h-full w-full'>
				<MyRoutes />
			</div>
		);
	} else {
		fullApp = (
			<div className='min-w-full min-h-full p-2'>
				<LoginComponent></LoginComponent>
			</div>
		);
	}

	return fullApp;
}

export default App;

import React from 'react';
import './App.css';
//import { Router, Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginComponent from './features/auth/loginComponent';
import { getIsLogged } from './features/auth/authSlice';
import MyRoutes from './features/sidebar/routes';

function App() {
	const loggedIn = useSelector(getIsLogged);
	let fullApp;
	if (loggedIn) {
		fullApp = (
			<div className='pl-2 pt-2 h-full w-full'>
				<MyRoutes />
			</div>
		);
	} else {
		fullApp = (
			<div className='pl-2 pt-2'>
				<LoginComponent></LoginComponent>
			</div>
		);
	}

	return fullApp;
}

export default App;

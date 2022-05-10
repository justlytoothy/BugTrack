import React from 'react';
import './App.css';
//import { Router, Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginComponent from './features/auth/loginComponent';
import HomeComponent from './features/home/homeComponent';
import { getIsLogged } from './features/auth/authSlice';

function App() {
	const loggedIn = useSelector(getIsLogged);
	let fullApp;
	if (loggedIn) {
		console.log("Success!")
		fullApp = (
			<div className=''>
				<HomeComponent></HomeComponent>
			</div>
		);
	} else {
		fullApp = (
			<div className=''>
				<LoginComponent></LoginComponent>
			</div>
		);
	}

	return fullApp;
}

export default App;

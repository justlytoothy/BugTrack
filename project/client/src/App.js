import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import LoginComponent from './features/auth/loginComponent';
import { getIsLogged, logoutUser } from './features/auth/authSlice';
import MyRoutes from './features/sidebar/routes';

function App() {
	const loggedIn = useSelector(getIsLogged);
	const dispatch = useDispatch();
	let fullApp;
	if (loggedIn) {
		fullApp = (
			<div className='overflow-hidden p-2 h-full w-full'>
				<MyRoutes />
			</div>
		);
	} else {
		dispatch(logoutUser);
		fullApp = (
			<div className='min-w-full min-h-full p-2'>
				<LoginComponent></LoginComponent>
			</div>
		);
	}

	return fullApp;
}

export default App;

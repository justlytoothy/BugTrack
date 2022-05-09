import React from 'react';
import './App.css';
import { Router, Switch, Route, Link } from 'react-router-dom';
import LoginComponent from './features/auth/loginComponent';
import ActionButton from './common/button';

function App() {
	return (
		<div className=''>
			<LoginComponent></LoginComponent>
		</div>
	);
}

export default App;

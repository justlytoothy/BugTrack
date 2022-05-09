import React from 'react';
import './App.css';
import { Router, Switch, Route, Link } from 'react-router-dom';
import LoginComponent from './features/auth/loginComponent';

function App() {
	return (
		<div className='bg-indigo-500 text-white h-full w-full'>
			<p className='text-5xl'>Hello World</p>
			<LoginComponent></LoginComponent>
		</div>
	);
}

export default App;

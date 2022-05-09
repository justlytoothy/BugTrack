import React from 'react';
import './App.css';
import { Router, Switch, Route, Link } from 'react-router-dom';
import './features/auth/loginComponent'

function App() {
	return (
		<div className='bg-indigo-500 text-white h-full w-full'>
			<p className='text-5xl'>Hello World</p>
		</div>
	);
}

export default App;

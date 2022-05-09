import React, { useState, useEffect } from 'react';
import ActionButton from '../../common/button';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const LoginComponent = () => {
	const dispatch = useDispatch();

	const [formInput, setFormInput] = useState({
		name: '',
		password: '',
	});

	function inputChanged(e) {
		setFormInput({
			...formInput,
			[e.target.name]: e.target.value,
		});
	}

	function submit(e) {
		console.log(formInput.name, formInput.password);
		e.preventDefault();
	}

	return (
		<div className='login-page'>
			<form className='login-panel text-black'>
				<h1 className='text-white text-2xl'>Login:</h1>
				<input
					name='name'
					placeholder='Name'
					onChange={inputChanged}
					value={formInput.name}></input>
				<input
					name='password'
					type='password'
					placeholder='Password'
					onChange={inputChanged}
					value={formInput.password}></input>
				<ActionButton
					click={submit}
					text='Login'
					type='cancel'></ActionButton>
			</form>
		</div>
	);
};
export default LoginComponent;

/*

import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {signIn} from '../../../Controllers/Redux/authSlice'

import './login.css'

export default () => {
    const dispatch = useDispatch(); 

    const [formInput, setFormInput] = useState ({
        name:"",
        password:""
    })

    function inputChanged(e){
        setFormInput({
            ...formInput,
            [e.target.name]:e.target.value
        })
    }

    function submit(e) {
        dispatch(signIn(formInput));
        e.preventDefault();
    }

    return (
        <div className="loginBG">
            <form className='login-panel'>
                <h1>Login:</h1>   
                <input name='name' placeholder='Name' onChange={inputChanged} value={formInput.name}></input> 
                <input name='password' type='password' placeholder='Password' onChange={inputChanged} value={formInput.password}></input> 
                <button id='loginButt' type='submit' onClick={submit}>Login</button>
            </form>    
        </div>
    )
}
*/

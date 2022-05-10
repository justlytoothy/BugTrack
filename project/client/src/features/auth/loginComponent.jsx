import React, { useState, useEffect } from 'react';
import common from '../../common/commonImports.js';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getLoginStatus, loginUser } from './authSlice.js';
const LoginComponent = () => {
	const dispatch = useDispatch();
	const loginStatus = useSelector(getLoginStatus);
	let isLoading;
	if (loginStatus === 'loading') {
		isLoading = true;
	} else {
		isLoading = false;
	}

	const [formInput, setFormInput] = useState({
		username: '',
		password: '',
	});

	function inputChanged(e) {
		setFormInput({
			...formInput,
			[e.target.name]: e.target.value,
		});
	}

	function submit(e) {
		e.preventDefault();
		console.log(formInput.username, formInput.password);
		let data = formInput;
		dispatch(loginUser(data));
	}

	return (
		<div className='login-page h-full w-full bg-[url("./images/imageBG.jpeg")] bg-cover bg-[rgba(0, 0, 0, 0.288)] bg-blend-multiply absolute'>
			<form className='login-panel text-black'>
				<h1 className='text-white text-2xl'>Login:</h1>
				<input
					name='username'
					placeholder='Username'
					onChange={inputChanged}
					value={formInput.username}></input>
				<input
					name='password'
					type='password'
					placeholder='Password'
					onChange={inputChanged}
					value={formInput.password}></input>
				<common.ActionButton
					loading={isLoading}
					click={submit}
					text='Login'
					type='submit'></common.ActionButton>
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
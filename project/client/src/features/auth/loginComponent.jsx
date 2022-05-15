import React, { useState } from 'react'
import common from '../../common/commonImports.js'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginStatus, loginUser } from './authSlice.js'
const LoginComponent = () => {
	const dispatch = useDispatch()
	const loginStatus = useSelector(getLoginStatus)
	let isLoading
	if (loginStatus === 'loading') {
		isLoading = true
	} else {
		isLoading = false
	}
	let errorStatus
	if (loginStatus === 'failed') {
		errorStatus = true
	} else {
		errorStatus = false
	}

	const [formInput, setFormInput] = useState({
		username: '',
		password: '',
	})

	function inputChanged(e) {
		setFormInput({
			...formInput,
			[e.target.name]: e.target.value,
		})
	}

	function submit(e) {
		e.preventDefault()
		let data = formInput
		dispatch(loginUser(data))
	}
	const errorMsg = () => {
		if (errorStatus) {
			return (
				<h3 className='text-white text-sm'>
					Username and/or password incorrect
				</h3>
			)
		}
	}

	return (
		<div className='overflow-hidden h-full w-full bg-[url("./images/imageBG.jpeg")] bg-cover bg-[rgba(0, 0, 0, 0.288)] bg-blend-multiply absolute'>
			<div className='h-full'>
				<form className='login-panel bg-prime-color text-black mx-auto my-[25vh] h-1/2 w-1/4'>
					<h1 className='text-white text-2xl m-1 mt-6'>Login:</h1>
					<input
						className='mx-4 h-12'
						name='username'
						placeholder='Username'
						onChange={inputChanged}
						value={formInput.username}></input>
					<input
						className='mx-4 h-12'
						name='password'
						type='password'
						placeholder='Password'
						onChange={inputChanged}
						value={formInput.password}></input>
					<common.ActionButton
						extraClass='h-10'
						loading={isLoading}
						click={submit}
						text='Login'
						type='submit'></common.ActionButton>
					{errorMsg()}
				</form>
			</div>
		</div>
	)
}
export default LoginComponent

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

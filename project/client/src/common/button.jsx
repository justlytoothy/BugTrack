import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
let content = '';
const ActionButton = (props) => {
	switch (props.type) {
		case 'submit':
			content = (
				<button
					onClick={props.click}
					className='bg-color3 hover:bg-button-hover transition-all rounded text-center text-white font-bold font-sans px-5 py-1 m-1 whitespace-nowrap text-xl'>
					{props.text}
				</button>
			);
			break;
		case 'cancel':
			content = (
				<button
					onClick={props.click}
					className='whitespace-nowrap text-slate-gray transition-all border border-solid rounded border-slate-gray font-bold font-sans text-xl px-5 py-1 lg:hover:text-white lg:hover:bg-slate-gray disabled:opacity-50 disabled:hover:bg-white m-1'>
					{props.text}
				</button>
			);
			break;
		case 'delete':
			content = (
				<button
					onClick={props.click}
					className='whitespace-nowrap py-1 px-5 rounded transition-all bg-delete-red text-white text-xl font-bold font-sans lg:hover:bg-red-hover disabled:opacity-50 disabled:hover:bg-delete-red m-1'>
					{props.text}
				</button>
			);
			break;
		default:
			content = (
				<button
					onClick={props.click}
					className='bg-color3 hover:bg-button-hover transition-all rounded text-center text-white font-bold font-sans px-5 py-1 m-1 whitespace-nowrap'>
					{props.text}
				</button>
			);
			break;
	}
	return content;
};
export default ActionButton;

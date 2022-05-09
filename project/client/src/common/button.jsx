import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const decideType = () => {
    const typeNum = 0;
    if 
}

const ActionButton = (props) => {
	if (props.type == null) {
		return (
			<button
				onClick={props.click}
				className='bg-color3 hover:bg-button-hover transition-all rounded text-center text-white font-bold font-sans px-5 py-1 m-1 whitespace-nowrap'>
				{props.text}
			</button>
		);
	}
};
export default ActionButton;

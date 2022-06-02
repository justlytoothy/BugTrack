import React from 'react'

const ActionButton = (props) => {
	let content = ''
	let text = props.text
	if (props.loading) {
		text = ''
	}
	switch (props.type) {
		case 'submit':
			content = (
				<button
					onClick={props.click}
					// className={
					// 	props.extraClass +
					// 	' bg-color-3 w-fit h-8 hover:bg-button-hover transition-all rounded text-center text-white font-bold font-sans px-5 m-2 whitespace-nowrap'
					// }
					className={
						props.extraClass +
						' whitespace-nowrap bg-color-3 min-w-fit h-8 text-white transition-all border border-solid rounded border-slate-gray font-bold font-sans text-xl px-5 text-center hover:text-white hover:bg-button-hover disabled:opacity-50 disabled:hover:bg-white m-2'
					}>
					{text}
				</button>
			)
			break
		case 'cancel':
			content = (
				<button
					onClick={props.click}
					className='whitespace-nowrap w-fit h-8 text-slate-gray transition-all border border-solid rounded border-slate-gray font-bold font-sans text-xl px-5 text-center lg:hover:text-white lg:hover:bg-slate-gray disabled:opacity-50 disabled:hover:bg-white m-2'>
					<h1>{text}</h1>
				</button>
			)
			break
		case 'delete':
			content = (
				<button
					onClick={props.click}
					className='whitespace-nowrap w-fit h-8 py-1 px-5 rounded transition-all bg-delete-red text-white text-xl font-bold font-sans lg:hover:bg-red-hover disabled:opacity-50 disabled:hover:bg-delete-red m-2'>
					{text}
				</button>
			)
			break
		default:
			content = (
				<button
					onClick={props.click}
					className='bg-color-3 hover:bg-button-hover transition-all rounded text-center text-white font-bold font-sans px-5 py-1 m-2 whitespace-nowrap'>
					{text}
				</button>
			)
			break
	}

	return content
}
export default ActionButton

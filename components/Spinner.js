import React from 'react';

function Spinner({ message }) {
	return (
		<div className='flex flex-col justify-center items-center w-full h-full'>
			<div className='w-16 h-16 border rounded-full border-lg border-blue-600' />

			<p className='text-lg text-center px-2'>{message}</p>
		</div>
	);
}

export default Spinner;

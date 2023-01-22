import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

const Pin = ({ pin, user }) => {
	const [postHovered, setPostHovered] = useState(false);
	const [savingPost, setSavingPost] = useState(false);
	const alreadySaved = false;

	const router = useRouter();

	const { user: pinUser, imageUrl, id, destination } = pin;

	const deletePin = (id) => {};

	return (
		<div className='m-2'>
			<div
				onMouseEnter={() => setPostHovered(true)}
				onMouseLeave={() => setPostHovered(false)}
				onClick={() => router.push(`/pin/${id}`)}
				className=' relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
			>
				{imageUrl && (
					<img className='rounded-lg w-full ' src={imageUrl} alt='user-post' />
				)}
				{postHovered && (
					<div
						className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
						style={{ height: '100%' }}
					>
						<div className='flex items-center justify-between'>
							<div className='flex gap-2'>
								<a
									href={`${imageUrl}?dl=`}
									download
									onClick={(e) => {
										e.stopPropagation();
									}}
									className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
								>
									<MdDownloadForOffline />
								</a>
							</div>
							{/* {alreadySaved?.length !== 0 ? (
								<button
									type='button'
									className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
								>
									{pin?.save?.length} Saved
								</button>
							) : (
								<button
									onClick={(e) => {
										e.stopPropagation();
										savePin(id);
									}}
									type='button'
									className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
								>
									{pin?.save?.length} {savingPost ? 'Saving' : 'Save'}
								</button>
							)} */}
						</div>
						<div className=' flex justify-between items-center gap-2 w-full'>
							{destination?.slice(8).length > 0 ? (
								<a
									href={destination}
									target='_blank'
									className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
									rel='noreferrer'
								>
									{' '}
									<BsFillArrowUpRightCircleFill />
									{destination?.slice(8, 17)}...
								</a>
							) : undefined}
							{pinUser?.uid === user?.uid && (
								<button
									type='button'
									onClick={(e) => {
										e.stopPropagation();
										deletePin(id);
									}}
									className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'
								>
									<AiTwotoneDelete />
								</button>
							)}
						</div>
					</div>
				)}
			</div>
			<Link
				href={`/user/${pinUser?.displayName}`}
				className='flex gap-2 mt-2 items-center'
			>
				<img
					className='w-8 h-8 rounded-full object-cover'
					src={pinUser?.photoUrl}
					alt='user-profile'
				/>
				<p className='font-semibold capitalize'>{pinUser?.displayName}</p>
			</Link>
		</div>
	);
};

export default Pin;

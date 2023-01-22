import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePins } from '../context/PinsContext';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const PinDetail = ({ user }) => {
	const router = useRouter();
	const { getPinById } = usePins();
	const pinId = router.query.id;
	const [pinDetail, setPinDetail] = useState();

	useEffect(() => {
		const fetchPin = async () => {
			const res = await getPinById(pinId);
			setPinDetail(res);
			console.log(res);
		};
		fetchPin();
	}, [pinId]);

	if (!pinDetail) {
		return <Spinner message='Showing pin' />;
	}

	return (
		<>
			{PinDetail && (
				<div className='flex xl:flex-row flex-col mx-auto rounded-lg'>
					<div className='flex xl:w-1/2'>
						<img
							className='rounded-lg'
							src={pinDetail?.imageUrl}
							alt='user-post'
						/>
					</div>
					<div className='w-full xl:1/2 p-5 flex-1'>
						<div className='flex items-center justify-between'>
							<div className='flex gap-2 items-center'>
								<a
									href={`${pinDetail?.imageUrl}?dl=`}
									download
									className='bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100'
								>
									<MdDownloadForOffline />
								</a>
							</div>
							<a href={pinDetail.destination} target='_blank' rel='noreferrer'>
								{pinDetail.destination?.slice(8)}
							</a>
						</div>
						<div>
							<h1 className='text-4xl font-bold break-words mt-3'>
								{pinDetail.title}
							</h1>
							<p className='mt-3'>{pinDetail.about}</p>
						</div>
						<Link
							href={`/user/${pinDetail?.user?.displayName}`}
							className='flex gap-2 mt-5 items-center bg-white rounded-lg '
						>
							<img
								src={pinDetail?.user.photoUrl}
								className='w-10 h-10 rounded-full'
								alt='user-profile'
							/>
							<p className='font-bold'>{pinDetail?.user.displayName}</p>
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default PinDetail;

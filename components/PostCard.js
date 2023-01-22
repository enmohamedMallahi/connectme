import React from 'react';

const PostCard = ({ post }) => {
	return (
		<div className='border rounded-lg'>
			<div className='py-2 px-4 flex justify-between items-center'>
				<div className='flex gap-2 items-center'>
					<img
						className='w-8 h-8 object-cover rounded-full'
						src={post.user.profileImage}
						alt=''
					/>
					<h4 className='font-bold text-sm'>{post.user.username}</h4>
				</div>
				<div className='text-sm'>{post.posted}</div>
			</div>
			<img className='w-full' src={post.image} alt='' />
			<div className='p-4'>
				<p className='pb-2 text-sm'>{post.body}</p>
				<div className='flex gap-2 text-sm'>
					<span className='text-indigo-700'>#Nature</span>
					<span className='text-indigo-700'>#Peace</span>
				</div>
			</div>
		</div>
	);
};

export default PostCard;

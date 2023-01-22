import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import PostCard from './PostCard';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';

const Layout = ({ user, children }) => {
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const scrollRef = useRef(null);

	useEffect(() => {
		scrollRef.current.scrollTo(0, 0);
	});

	return (
		<div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
			<div className='hidden md:w-3/12 md:flex h-screen flex-initial'>
				<Sidebar user={user && user} />
			</div>
			<div className='flex md:w-3/12 md:hidden flex-row'>
				<div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
					<HiMenu
						fontSize={40}
						className='cursor-pointer'
						onClick={() => setToggleSidebar(true)}
					/>
					<Link href='/'>
						<img src='./logo.png' alt='logo' className='w-28' />
					</Link>
					<Link href={`user-profile/${user?._id}`}>
						<img
							src={user?.image}
							alt='user-pic'
							className='w-9 h-9 rounded-full '
						/>
					</Link>
				</div>
				{toggleSidebar && (
					<div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
						<div className='absolute w-full flex justify-end items-center p-2'>
							<AiFillCloseCircle
								fontSize={30}
								className='cursor-pointer'
								onClick={() => setToggleSidebar(false)}
							/>
						</div>
						<Sidebar closeToggle={setToggleSidebar} user={user && user} />
					</div>
				)}
			</div>

			<div className='p-4 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
				<Navbar user={user} />
				{children}
			</div>
		</div>
	);
};

export default Layout;

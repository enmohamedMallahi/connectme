import React from 'react';
import Masonry from 'react-masonry-css';
import { useAuth } from '../context/AuthContext';

import Pin from './Pin';

const breakpointColumnsObj = {
	default: 4,
	3000: 6,
	2000: 5,
	1200: 3,
	1000: 2,
	500: 1,
};

const MasonryLayout = ({ pins }) => {
	const { user } = useAuth();

	return (
		<Masonry
			className='flex animate-slide-fwd'
			breakpointCols={breakpointColumnsObj}
		>
			{pins?.map((pin) => (
				<Pin key={pin.id} pin={pin} user={user} className='w-max' />
			))}
		</Masonry>
	);
};

export default MasonryLayout;

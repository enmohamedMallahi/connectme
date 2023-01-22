import { useAuth } from '../context/AuthContext';
// import shareVideo from '../assets/share.mp4';
// import logo from '../assets/logowhite.png';

const Login = () => {
	const { signinWithGoogle } = useAuth();

	return (
		<div className='flex justify-start items-center flex-col h-screen'>
			<div className=' relative w-full h-full'>
				<video
					src='./share.mp4'
					type='video/mp4'
					loop
					controls={false}
					muted
					autoPlay
					className='w-full h-full object-cover'
				/>

				<div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blend-overlay'>
					<div className='p-5'>
						<img src='./logo.png' width='130px' />
					</div>

					<div className='shadow-2xl'>
						<button
							className='bg-indigo-500 text-white flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
							onClick={signinWithGoogle}
						>
							&nbsp; Sign in with Google
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router';

const Login = ({ setIsAuth }) => {
	let navigate = useNavigate();
	const signInWithGoogle = () => {
		signInWithPopup(auth, provider).then((result) => {
			setIsAuth(true);
			localStorage.setItem('isAuth', true);
			navigate('/');
		});
	};

	return (
		<div>
			<button
				onClick={signInWithGoogle}
				className="flex justify-center items-center text-center mx-auto mb-56"
			>
				<img
					src="https://pixlok.com/wp-content/uploads/2021/04/Google-Icon-PNG-768x768.jpg"
					className="h-6 w-6 bg-brown"
				/>
				<h1>sign in with google</h1>
			</button>
		</div>
	);
};

export default Login;

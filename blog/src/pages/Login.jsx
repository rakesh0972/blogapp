import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';

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
				className="flex justify-center items-center text-center mx-auto mb-64 py-2 px-5  border border-grey hover:bg-green transition-all 3ms ease-in hover:text-"
			>
				<FcGoogle />
				&nbsp;
				<h1>Sign in with google</h1>
			</button>
		</div>
	);
};

export default Login;

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
			<p>Sign in with google</p>
			<button onClick={signInWithGoogle}>sign in with google</button>
		</div>
	);
};

export default Login;

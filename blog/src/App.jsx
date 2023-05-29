// import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import { useState } from 'react';
import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';

function App() {
	const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

	const signUserOut = () => {
		signOut(auth).then(() => {
			localStorage.clear();
			setIsAuth(false);
			window.location.pathname = '/login';
		});
	};

	return (
		<>
			<BrowserRouter>
				<nav className="bg-red-700">
					<Link to="/">Home</Link>

					{!isAuth ? (
						<Link to="/login">login</Link>
					) : (
						<>
							<Link to="/createpost">Create</Link>
							<button onClick={signUserOut}> Log Out</button>
						</>
					)}
				</nav>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route
						exact
						path="/login"
						element={<Login setIsAuth={setIsAuth} />}
					/>
					<Route
						exact
						path="/createpost"
						element={<CreatePost isAuth={isAuth} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
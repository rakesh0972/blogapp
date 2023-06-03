// import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import { useState } from 'react';
import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';
import Details from './pages/Details';

function App() {
	const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

	const signUserOut = () => {
		signOut(auth).then(() => {
			localStorage.clear();
			setIsAuth(false);
			window.location.pathname = '/';
		});
	};

	return (
		<>
			<BrowserRouter>
				<Link to="/">
					<h1
						className="text-left text-4xl font-thin text-center pt-9  text-green"
						style={{
							'font-family': 'Josefin Sans',
						}}
					>
						Over.&.Out
					</h1>
				</Link>
				<nav className="bg-blue-700 py-14 w-full flex justify-center items-center gap-4 ">
					<div className="text-white">
						<Link
							to="/"
							className="hover:text-green transition-all ease-in 3ms"
						>
							Home
						</Link>
					</div>

					{!isAuth ? (
						<div className="text-white">
							<Link
								to="/login"
								className="hover:text-green transition-all ease-in 3ms"
							>
								login
							</Link>
						</div>
					) : (
						<>
							<div className="text-white flex gap-4">
								<Link
									to="/createpost"
									className="hover:text-green transition-all ease-in 3ms"
								>
									Create
								</Link>
								<button
									onClick={signUserOut}
									className="hover:text-green transition-all ease-in 3ms"
								>
									{' '}
									Log Out
								</button>
							</div>
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
					<Route exact path="posts/:id" element={<Details isAuth={isAuth} />} />
				</Routes>

				<footer className="text-center font-sans pb-7 text-grey text-sm">
					Over & Out | 2023
				</footer>
			</BrowserRouter>
		</>
	);
}

export default App;

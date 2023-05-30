import { useState, useEffect } from 'react';
import { db, auth } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ isAuth }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const postCollection = collection(db, 'posts');
	let navigate = useNavigate();

	const createpost = async () => {
		await addDoc(postCollection, {
			title,
			description,
			author: {
				name: auth.currentUser.displayName,
				id: auth.currentUser.uid,
			},
		});
		navigate('/');
	};

	useEffect(() => {
		if (!isAuth) {
			navigate('/login');
		}
		console.log('login effect');
	}, []);

	return (
		<div>
			<div className="container">
				<div className="container">
					<h1>create a post </h1>
					<label>Title:</label>
					<input
						type="text"
						placeholder="title..."
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
					<label>Description</label>
					<textarea
						type="text"
						placeholder="Decsription..."
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
					<button onClick={createpost}>Submit post </button>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;

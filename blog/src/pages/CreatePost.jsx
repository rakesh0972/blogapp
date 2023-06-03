import { useState, useEffect } from 'react';
import { db, auth } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { storage } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

const CreatePost = ({ isAuth }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState();

	const postCollection = collection(db, 'posts');
	let navigate = useNavigate();

	// const handle = async () => {
	// 	await addDoc(collection(db, 'posts'), {
	// 		title,
	// 		description,
	// 		imageUrls,
	// 		author: {
	// 			name: auth.currentUser.displayName,
	// 			id: auth.currentUser.uid,
	// 		},
	// 	})
	// 		.then(() => {
	// 			alert('success');
	// 		})
	// 		.catch((err) => {
	// 			alert(err.message);
	// 		});
	// };

	const upload = async () => {
		if (imageUpload == null) return;

		try {
			const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
			uploadBytes(imageRef, imageUpload)
				.then(async (snapshot) => {
					await getDownloadURL(snapshot.ref).then(async (url) => {
						setImageUrls(url);
						console.log(url);
					});
				})
				.then(setTimeout(fuck, 3000));
		} catch (error) {
			console.log('Error during upload:', error);
			fuck();
		}
	};

	const fuck = () => {
		try {
			addDoc(postCollection, {
				title,
				description,
				imageUrls,
				author: {
					name: auth.currentUser.displayName,
					id: auth.currentUser.uid,
				},
			}).then(
				(res) => (res == '200' ? alert('success') : navigate('/')),

				console.log('timer rinnfu')
			);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!isAuth) {
			navigate('/login');
		}
		console.log('login effect');
	}, []);

	return (
		<div>
			<div>
				<div>
					<h1
						className="bg-brown w-full text-black/90 px-9 py-7 md:py-9 my-3 text-left text-4xl font-thin"
						style={{
							'font-family': 'Josefin Sans',
						}}
					>
						Create a post
					</h1>

					<div className="main border-green/50  p-5">
						<div className="title flex flex-col">
							<label className="text-2xl text-left font-light text-black/80 pb-4">
								Title:
							</label>
							<input
								type="text"
								placeholder="title..."
								onChange={(e) => {
									setTitle(e.target.value);
								}}
								className="border border-green focus:outline-none focus:ring focus:border-blue-300 rounded-md py-2 px-4 block w-full appearance-none leading-normal "
							/>
						</div>

						<div className="desc flex justify-between flex-col mt-4">
							<label className="text-2xl text-left font-light text-black/80 pb-4">
								Description
							</label>
							<textarea
								type="text"
								placeholder="Decsription..."
								onChange={(e) => {
									setDescription(e.target.value);
								}}
								className="border h-36 border-green focus:outline-none focus:ring focus:border-blue-300 rounded-md py-2 px-4 block w-full appearance-none leading-normal"
							/>
						</div>

						<div className="file my-4">
							<input
								type="file"
								onChange={(event) => {
									setImageUpload(event.target.files[0]);
								}}
							/>
						</div>
						<div className="flex justify-center">
							<button
								onClick={upload}
								className="bg-green px-5 py-3 text-[#fff] hover:bg-green/70 transition-all ease-in 3ms  "
							>
								Submit post
							</button>
						</div>
					</div>

					{/* {imageUrls.map((url) => {
						return <img src={url} />;
					})} */}
				</div>
			</div>
		</div>
	);
};

export default CreatePost;

import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { Link } from 'react-router-dom';

const Home = (isAuth) => {
	const [postLists, setPostList] = useState([]);
	const postsCollectionRef = collection(db, 'posts');

	useEffect(() => {
		const getPosts = async () => {
			const data = await getDocs(postsCollectionRef);
			setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		console.log(postLists);
		console.log('gg bro');
		getPosts();
	}, []);

	const deletePost = async (id) => {
		const postDoc = doc(db, 'posts', id);
		await deleteDoc(postDoc);
		window.location.reload();
	};
	return (
		<div className="homePage">
			{postLists.map((post) => {
				return (
					// eslint-disable-next-line react/jsx-key
					<div className="post bg-red-500 py-9">
						<Link to={`/posts/${post.id}`}>
							<div className="bg-green-500 py-8">
								<div className="postHeader ">
									<div className="title">
										<h1> {post.title}</h1>
									</div>
								</div>
								<div className="postTextContainer"> {post.description} </div>
								<h3>@{post.author?.name}</h3>
							</div>
						</Link>
						<div className="deletePost">
							{isAuth && post.author?.id === auth.currentUser?.uid && (
								<button
									onClick={() => {
										deletePost(post.id);
									}}
								>
									{' '}
									&#128465;
								</button>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Home;

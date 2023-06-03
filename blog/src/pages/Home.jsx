import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { Link } from 'react-router-dom';
import { storage } from '../firebase-config';
import {
	ref,
	uploadBytes,
	getDownloadURL,
	listAll,
	list,
} from 'firebase/storage';
import { FcFullTrash } from 'react-icons/fc';
import { CiCirclePlus } from 'react-icons/ci';

const Home = (isAuth) => {
	const [postLists, setPostList] = useState([]);
	const imagesListRef = ref(storage, 'images/');
	const postsCollectionRef = collection(db, 'posts');
	const [imageUrls, setImageUrls] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			// listAll(imagesListRef).then((response) => {
			// 	response.items.forEach((item) => {
			// 		getDownloadURL(item).then((url) => {
			// 			setImageUrls((prev) => [...prev, url]);
			// 		});
			// 	});
			// });
			// console.log(imageUrls);

			const data = await getDocs(postsCollectionRef);
			setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		console.log(postLists);
		console.log('gg bro');
		getPosts();
		deletePost();
	}, []);

	const deletePost = async (id) => {
		const postDoc = doc(db, 'posts', id);
		await deleteDoc(postDoc);
		window.location.reload();
	};

	function cut(string) {
		if (string.length > 200) {
			string = string.substring(0, 199) + '...';
		}
		console.log(string.length);
		return string;
	}

	function uppercase(string) {
		return string?.charAt(0).toUpperCase() + string?.slice(1);
	}

	return (
		<div className="homePage font-main text-black p-5 md:w-[60%] mx-auto ">
			{postLists.map((post) => {
				return (
					// eslint-disable-next-line react/jsx-key
					<div className="post mb-7 border p-4 md:h-[50%] border-green/50 ">
						<Link to={`/posts/${post.id}`}>
							<div>
								<div className="postHeader ">
									<div className="image relative group ">
										<img
											src={post?.imageUrls}
											className=" object-cover h-full w-full "
										/>
										<div className="absolute top-0 inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity transition-all ease-in 3ms" />

										<CiCirclePlus className="right-0 text-5xl text-[#fff]/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block transition-all ease-in 3ms" />
									</div>

									<div
										style={{
											'font-family': 'Josefin Sans',
										}}
										className="title text-2xl pt-4 px-4 font-medium text-black/80"
									>
										<span> {uppercase(post?.title)}</span>
									</div>
								</div>
							</div>
						</Link>
						<div className="text-base pl-4 pb-6 text-black/60 text-left">
							{/* {post?.description} */}
							{cut(post?.description)}
						</div>

						<div className="flex justify-between px-4">
							<h3 className=" text-black/40">@{post.author.name}</h3>
							<div className="deletePost">
								{isAuth && post.author?.id === auth.currentUser?.uid && (
									<button
										onClick={() => {
											deletePost(post.id);
										}}
									>
										{' '}
										<FcFullTrash />
									</button>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Home;

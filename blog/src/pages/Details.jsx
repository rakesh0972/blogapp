import { useState, useEffect } from 'react';
import { db, auth } from '../firebase-config';
import { useParams } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { FcFullTrash } from 'react-icons/fc';

const Details = ({ isAuth }) => {
	const { id } = useParams();
	console.log(id);
	const [product, setProduct] = useState({});
	useEffect(() => {
		const single = async () => {
			if (!id) return false;
			const docRef = doc(db, 'posts', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				setProduct(data);
				console.log('daat ato');
			} else {
				console.log('no data');
			}
		};
		single();
		console.log(product);
	}, [id]);

	const deletePost = async (id) => {
		const postDoc = doc(db, 'posts', id);
		await deleteDoc(postDoc);
		window.location.reload();
		window.location.replace('/');
	};
	function uppercase(string) {
		return string?.charAt(0).toUpperCase() + string?.slice(1);
	}

	return (
		<div className="font-sans text-text text-black p-5 ">
			<div className=" bg-brown text-black/90  px-9 py-7 md:py-9 my-3 flex justify-between ">
				<h1
					className="text-left text-4xl font-thin"
					style={{
						'font-family': 'Josefin Sans',
					}}
				>
					{uppercase(product?.title)}
				</h1>
				<div className="deletePost">
					{isAuth && product.author?.id === auth.currentUser?.uid && (
						<button
							onClick={() => {
								deletePost(id);
							}}
							className="w-full h-full text-xl"
						>
							{' '}
							<FcFullTrash />
						</button>
					)}
				</div>
			</div>

			<div className="dtails md:w-[60%] md:mx-auto lg:w-[70%]">
				{/* <div className="pb-[100vh] relative"> */}
				<img src={product?.imageUrls} className=" w-full object-contain" />
				{/* </div> */}

				<div className="font-normal text-base text-left py-7  leading-6 ">
					<h1>{product?.description}</h1>
				</div>
				<h1
					style={{
						'font-family': 'Josefin Sans',
					}}
					className="text-center py-14 text-3xl font-light text-black"
				>
					{uppercase(product?.author?.name)}
				</h1>
			</div>
		</div>
	);
};

export default Details;

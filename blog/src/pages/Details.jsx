import { useState, useEffect } from 'react';
import { db, auth } from '../firebase-config';
import { useParams } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

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

	return (
		<div>
			<h1>{product.title}</h1>
			<h1>{product.description}</h1>

			<div className="deletePost">
				{isAuth && product.author?.id === auth.currentUser?.uid && (
					<button
						onClick={() => {
							deletePost(id);
						}}
					>
						{' '}
						&#128465;
					</button>
				)}
			</div>
		</div>
	);
};

export default Details;

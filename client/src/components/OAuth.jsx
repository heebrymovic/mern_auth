import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { signInUpdateStart, signInUpdateSuccess, signInUpdateFailure } from '../redux/userSlice';

const OAuth = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const { isLoading } = useSelector((state) => state.user);

	const handleGoogleAuth = async () => {
		try {
			dispatch(signInUpdateStart());

			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);

			const response = await signInWithPopup(auth, provider);

			const { email, photoURL } = response.user;

			const res = await axios.post('/api/auth/google', {
				email,
				username: email.split('@')[0],
				profilePicture: photoURL
			});

			dispatch(signInUpdateSuccess(res.data.user));
			toast(res.data.message);
			navigate('/');
		} catch (err) {
			dispatch(signInUpdateFailure());
			toast(err?.response?.data?.message || err.message);
		}
	};

	return (
		<button
			onClick={handleGoogleAuth}
			type="button"
			className="bg-red-500 cursor-pointer transition-opacity text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
		>
			Continue with google
		</button>
	);
};

export default OAuth;

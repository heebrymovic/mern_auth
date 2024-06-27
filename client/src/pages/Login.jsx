import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signInUpdateStart, signInUpdateSuccess, signInUpdateFailure } from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import OAuth from '../components/OAuth';

const initialState = {
	email: '',
	password: ''
};

const Login = () => {
	const [formData, setFormData] = useState(initialState);
	const { isLoading } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleInput = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			dispatch(signInUpdateStart());
			const res = await axios.post('/api/auth/login', formData);
			dispatch(signInUpdateSuccess(res.data.user));
			toast.success(res.data.message);
			navigate('/');
		} catch (err) {
			dispatch(signInUpdateFailure());
			toast.error(err.response.data.message || err.message);
		}
	};

	return (
		<div className="mt-4 p-3 max-w-lg mx-auto">
			<h1 className="font-bold text-center text-2xl">Sign In</h1>

			<form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
				<input
					type="email"
					className="border border-solid border-slate-500 rounded-md p-3 outline-none"
					placeholder="Email"
					required
					id="email"
					name="email"
					value={formData.email}
					onChange={handleInput}
				/>

				<input
					type="password"
					className="border border-solid border-slate-500 rounded-md p-3 outline-none"
					placeholder="Password"
					required
					id="password"
					name="password"
					value={formData.password}
					onChange={handleInput}
				/>

				<button
					disabled={isLoading}
					className="bg-slate-900 cursor-pointer transition-opacity text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
				>
					Sign In
				</button>
				<OAuth />
			</form>

			<div className="mt-3">
				<p>
					<span>Don't have an account? </span>
					<Link to="/register">
						<span className="text-blue-500">Sign Up</span>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import OAuth from '../components/OAuth';

const initialState = {
	username: '',
	email: '',
	password: ''
};

const Register = () => {
	const [formData, setFormData] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleInput = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			const res = await axios.post('/api/auth/register', formData);
			toast.success(res.data.message);
			navigate('/login');
		} catch (err) {
			toast.error(err.response.data.message || err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mt-4 p-3 max-w-lg mx-auto">
			<h1 className="font-bold text-center text-2xl">Sign Up</h1>

			<form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
				<input
					type="text"
					className="border border-solid border-slate-500 rounded-md p-3 outline-none"
					placeholder="Username"
					required
					value={formData.username}
					onChange={handleInput}
					id="username"
					name="username"
				/>

				<input
					type="email"
					className="border border-solid border-slate-500 rounded-md p-3 outline-none"
					placeholder="Email"
					value={formData.email}
					onChange={handleInput}
					required
					id="email"
					name="email"
				/>

				<input
					type="password"
					className="border border-solid border-slate-500 rounded-md p-3 outline-none"
					placeholder="Password"
					required
					value={formData.password}
					onChange={handleInput}
					id="password"
					name="password"
				/>

				<button
					disabled={isLoading}
					className="bg-slate-900 cursor-pointer transition-opacity text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
				>
					Sign Up
				</button>
				<OAuth />
			</form>

			<div className="mt-3">
				<p>
					<span>Already have an account? </span>
					<Link to="/login">
						<span className="text-blue-500">Sign In</span>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;

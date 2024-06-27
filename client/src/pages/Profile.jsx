import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { app } from '../firebase';
import axios from 'axios';
import { deleteLogoutSuccess } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

const Profile = () => {
	const uploadFileRef = useRef();
	const [uploadFile, setUploadFile] = useState(null);
	const [imageUploadPercent, setImageUploadPercent] = useState(0);
	const [imgUploadUrl, setImgUploadUrl] = useState('');

	const navigate = useNavigate();

	const [formData, setFormData] = useState({});

	const updateProfile = useUpdateProfile();

	const dispatch = useDispatch();
	const {
		currentUser: { _id, username, email, profilePicture },
		isLoading
	} = useSelector((state) => state.user);

	useEffect(() => {
		if (uploadFile) {
			handleUpload(uploadFile);
		}
	}, [uploadFile]);

	useEffect(() => {
		if (imageUploadPercent === 100 && imgUploadUrl) {
			updateProfile({ profilePicture: imgUploadUrl });
		}
	}, [imageUploadPercent, imgUploadUrl]);

	const handleInput = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const handleUpload = (uploadFile) => {
		const storage = getStorage(app);

		const imageRef = storageRef(storage, Date.now() + uploadFile.name);

		const uploadTask = uploadBytesResumable(imageRef, uploadFile);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

				setImageUploadPercent(percent);
			},
			(error) => {
				console.log(error);
			},

			async () => {
				const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

				setImgUploadUrl(downloadUrl);
			}
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateProfile(formData);
	};

	const handleDelete = async () => {
		try {
			const res = await axios.get(`/api/user/delete/${_id}`);
			toast.success(res.data.message);
			dispatch(deleteLogoutSuccess());
		} catch (err) {
			toast.error(err.response.data.message || err.message);
		}
	};

	const handleLogout = async () => {
		const res = await axios.get(`/api/auth/logout`);
		toast.success(res.data.message);
		dispatch(deleteLogoutSuccess());
		navigate('/');
	};

	return (
		<div className="mt-5 max-w-lg mx-auto">
			<div>
				<input
					type="file"
					className="hidden"
					ref={uploadFileRef}
					onChange={(e) => setUploadFile(e.target.files[0])}
					accept=".png, .jpg, .jpeg"
				/>
				<img
					alt="profile"
					src={uploadFile ? URL.createObjectURL(uploadFile) : profilePicture || '/noAvatar.png'}
					className="w-24 h-24 rounded-full mx-auto cursor-pointer object-cover"
					onClick={() => uploadFileRef.current.click()}
				/>
				<p className="text-center mt-3 text-green-700">
					{imageUploadPercent > 0 && imageUploadPercent < 100
						? `Uploading ${imageUploadPercent}%`
						: imageUploadPercent === 100
						  ? 'Uploaded Successfully'
						  : null}
				</p>
			</div>

			<form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
				<input
					type="email"
					className="border border-solid border-slate-500 disabled:bg-slate-200 rounded-md p-3 outline-none"
					placeholder="Username"
					disabled
					id="email"
					name="email"
					defaultValue={email}
				/>

				<input
					type="text"
					className="border border-solid border-slate-500 rounded-md p-3 outline-none"
					placeholder="Email"
					id="username"
					name="username"
					required
					defaultValue={username}
					onChange={handleInput}
				/>

				<input
					type="password"
					className="border border-solid border-slate-500 rounded-md p-3 outline-none"
					placeholder="password"
					onChange={handleInput}
					required
					id="password"
					name="password"
				/>

				<button
					disabled={isLoading}
					className="bg-slate-900 cursor-pointer transition-opacity text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
				>
					Update
				</button>
			</form>

			<div className="flex justify-between mt-2 text-red-500">
				<p className="cursor-pointer" onClick={handleDelete}>
					Delete Account
				</p>
				<p className="cursor-pointer" onClick={handleLogout}>
					Sign Out
				</p>
			</div>
		</div>
	);
};

export default Profile;

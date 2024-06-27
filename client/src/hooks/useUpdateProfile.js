import { useSelector, useDispatch } from 'react-redux';
import { signInUpdateStart, signInUpdateSuccess, signInUpdateFailure } from '../redux/userSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useUpdateProfile = () => {
	const dispatch = useDispatch();
	const {
		currentUser: { _id }
	} = useSelector((state) => state.user);

	async function updateProfile(data) {
		try {
			dispatch(signInUpdateStart());
			const res = await axios.put(`/api/user/update/${_id}`, data);

			dispatch(signInUpdateSuccess(res.data.user));
			toast.success(res.data.message);
		} catch (err) {
			dispatch(signInUpdateFailure());
			toast.error(err.response.data.message || err.message);
		}
	}

	return updateProfile;
};

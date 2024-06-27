import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProtectedRoute = () => {
	const { currentUser, isAuthenticated } = useSelector((state) => state.user);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated || !currentUser._id) navigate('/login');
	}, [isAuthenticated, currentUser]);

	return isAuthenticated && currentUser._id ? <Outlet /> : null;
};

export default ProtectedRoute;

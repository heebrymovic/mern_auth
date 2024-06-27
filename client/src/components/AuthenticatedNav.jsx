import { Link } from 'react-router-dom';

const AuthenticatedNav = ({ src }) => {
	return (
		<Link to="/profile">
			<img src={src || '/noAvatar.png'} className="w-8 h-8 rounded-full object-cover" />
		</Link>
	);
};

export default AuthenticatedNav;

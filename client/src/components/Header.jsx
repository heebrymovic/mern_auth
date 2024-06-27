import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthenticatedNav from './AuthenticatedNav';

const Header = () => {
	const { currentUser, isAuthenticated } = useSelector((state) => state.user);

	return (
		<header className="bg-slate-300">
			<div className="p-3 flex justify-between items-center mx-auto max-w-7xl">
				<Link to="/">
					<h1 className="font-bold">AuthApp</h1>
				</Link>

				<ul className="flex gap-3 items-center">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>

					<li>
						{currentUser._id && isAuthenticated ? (
							<AuthenticatedNav src={currentUser?.profilePicture} />
						) : (
							<Link to="/login">Sign In</Link>
						)}
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;

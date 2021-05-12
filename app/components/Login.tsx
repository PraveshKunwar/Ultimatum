import { NextComponentType } from 'next';
import { useRouter } from 'next/dist/client/router';

const Login: NextComponentType = () => {
	const router = useRouter();
	return (
		<div className="login">
			<button
				onClick={() => {
					router.push('/api/auth');
				}}
			>
				Login
			</button>
		</div>
	);
};

export default Login;

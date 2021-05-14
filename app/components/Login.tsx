import { NextComponentType } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

const Login: React.FC = (): JSX.Element => {
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

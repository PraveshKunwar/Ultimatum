import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState, useEffect } from 'react';

const Error: NextPage = () => {
	const router = useRouter();
	const [err, setErr] = useState<null | string>(null);
	useEffect(() => {
		setErr(router.query.error as string);
	}, [router]);
	return <div className="error">An error has occured: {err}</div>;
};


export default Error;
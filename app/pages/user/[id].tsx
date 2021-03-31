import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setToken } from '../../redux/actions/actions';

interface IsToken {
	isToken: null | string;
}

export default function DynamicRoute() {
	const router = useRouter();
	const isToken = useSelector((state: IsToken) => state.isToken);
	const dispatch = useDispatch();
	const code = router.query;
	useEffect(() => {
		console.log(code);
	}, []);
	return <div className="authed">BOIBOI</div>;
}

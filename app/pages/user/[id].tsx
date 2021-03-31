import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';

import { setToken } from '../../redux/actions/actions';

interface IsToken {
	isToken: null | string;
}

const User: NextPage = () => {
	return <div className="user">done for now</div>;
};

export default User;

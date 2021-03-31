import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {NextPage} from "next"
import { setToken } from '../../redux/actions/actions';

interface IsToken {
	isToken: null | string;
}

const User: NextPage = () => {
return <div className="user">HELLO WORLD</div>
}

export default User;
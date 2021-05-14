import { NextComponentType } from 'next';
import { User } from '../interfaces/User';

interface UserProps {
	user: User;
}

const UserComponent: React.FC<UserProps> = ({
	user,
}: UserProps): JSX.Element => {
	return (
		<div className="user-component">
			Welcome {`${user.username}#${user.discriminator}`}
		</div>
	);
};

export default UserComponent;

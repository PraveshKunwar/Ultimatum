import { NextPage } from 'next';
import GuildID from '../../components/GuildID';

const GuildPage: NextPage = (): JSX.Element => {
	return (
		<div className="guild-dashboard">
			<GuildID />
			HELLO GUILD PAGE
		</div>
	);
};

export default GuildPage;

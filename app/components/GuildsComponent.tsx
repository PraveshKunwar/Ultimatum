import { Guild } from '../interfaces/Guild';

interface GuildProps {
	guild: Guild[];
}

const GuildsComponent: React.FC<GuildProps> = ({
	guild,
}: GuildProps): JSX.Element => {
	return (
		<div className="guilds-component">
			{guild.map((x, i) => {
				return (
					<p key={i}>
						<a href={`guild/${x.id}`} key={i}>{x.name}</a> - {i} <br></br>
					</p>
				);
			})}
		</div>
	);
};

export default GuildsComponent;

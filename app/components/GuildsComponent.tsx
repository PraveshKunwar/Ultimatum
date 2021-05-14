import { Guild } from '../interfaces/Guild';

interface GuildProps {
	guild: Guild[];
}

const GuildsComponent: React.FC<GuildProps> = ({
	guild,
}: GuildProps): JSX.Element => {
	return (
		<div className="guilds-component">
			{guild.map((x) => {
				return (
					<p>
						{x.name} <br></br>
					</p>
				);
			})}
		</div>
	);
};

export default GuildsComponent;

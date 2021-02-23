import { Guild } from 'discord.js';
import mongoose, { Document, Model } from 'mongoose';

class DatabaseManger {
	public;
	public async checkModel(path: string, modelProps: object, guild?: Guild) {
		const importModel: mongoose.Model<mongoose.Document<any>> = require(path);
		const checkModel: mongoose.Document<any> | null = await importModel.findOne(
			{
				GuildId: guild?.id,
			}
		);
		if (!checkModel) {
			const newModel: Document = new importModel(modelProps);
			return await newModel
				.save()
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
	}
}

export { DatabaseManger };

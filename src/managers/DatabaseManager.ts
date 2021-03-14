import mongoose, { Model } from 'mongoose';

class DatabaseManager {
	public async findOne(
		findBy: object,
		model: mongoose.Model<mongoose.Document<any>>
	): Promise<mongoose.Document<any>> {
		return await model.findOne(findBy);
	}
	public async findAndCreate(
		findBy: object,
		model: mongoose.Model<mongoose.Document<any>>,
		props: object
	) {
		const check = await model.findOne(findBy);
		if (!check) {
			const NewModel = new model(props);
			NewModel.save().catch((err) => console.log(err));
		}
	}
	public async findUpdateOne(
		findBy: object,
		model: mongoose.Model<mongoose.Document<any>>,
		toUpdate: object
	) {
		mongoose.set('useFindAndModify', false);
		return await model.findOneAndUpdate(findBy, toUpdate);
	}
	public async findCreateUpdate(
		findBy: object,
		model: mongoose.Model<mongoose.Document<any>>,
		props: object,
		toUpdate: object
	) {
		const check = model.findOne(findBy, (err: any, checks: any) => {
			err ? console.log(err) : false;
			if (!checks) {
				const NewModel = new model(props);
				NewModel.save().catch((err) => console.log(err));
			}
		});
		await check.updateOne(toUpdate);
	}
	public async findOneAndRemove(
		findBy: object,
		model: mongoose.Model<mongoose.Document<any>>
	) {
		model.findOneAndDelete(findBy).catch((err) => console.log(err));
	}
}

export { DatabaseManager };

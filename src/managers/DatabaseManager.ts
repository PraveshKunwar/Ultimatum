import mongoose, { Model } from 'mongoose';

class DatabaseManager {
	public async findAndCreate(
		findBy: object,
		model: mongoose.Model<mongoose.Document<any>>,
		props: object
	) {
		const check = model.findOne(findBy);
		if (!check) {
			const NewModel = new model(props);
			NewModel.save()
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
	}
	public async findCreateUpdateOne(
		findBy: object,
		model: mongoose.Model<mongoose.Document<any>>,
		props: object,
		toUpdate: object
	) {
		const check = model.findOne(findBy, (err: any, checks: any) => {
			err ? console.log(err) : false;
			if (!checks) {
				const NewModel = new model(props);
				NewModel.save()
					.then((res) => console.log(res))
					.catch((err) => console.log(err));
			}
		});
		await check.updateOne(toUpdate);
	}
}

export { DatabaseManager };

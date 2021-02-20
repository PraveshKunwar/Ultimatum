import mongoose from 'mongoose';

const MongoInit = (): void => {
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		poolSize: 5,
	};
	mongoose.connect(
		`mongodb+srv://PraveshK:${process.env.MONGO_DB_PASSWORD}@ultimatum.5xc7g.mongodb.net/ultimatum`,
		options
	);
	mongoose.connection.on('connected', () => {
		console.log('Database has been connected.');
	});
	mongoose.connection.on('disconnected', () => {
		console.log('Database has been disconnected.');
	});
	mongoose.connection.on('error', (err) => {
		console.error(`Error: ${err.stack}`);
	});
	mongoose.Promise = global.Promise;
};

class Mongo {
	private mongoose = mongoose;
	public options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		poolSize: 5,
	};

	public Init(password: string | undefined) {
		this.mongoose = mongoose;
		this.mongoose.Promise = global.Promise;
		mongoose.connection.on('connected', () => {
			console.log('Database has been connected.');
		});
		mongoose.connection.on('disconnected', () => {
			console.log('Database has been disconnected.');
		});
		mongoose.connection.on('error', (err) => {
			console.error(`Error: ${err.stack}`);
		});
		mongoose
			.connect(
				`mongodb+srv://PraveshK:${password}@ultimatum.5xc7g.mongodb.net/ultimatum`,
				this.options
			)
			.catch((err) => console.log(err));
	}
}

export { Mongo };

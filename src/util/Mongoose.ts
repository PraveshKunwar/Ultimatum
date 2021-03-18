import mongoose from 'mongoose';
require('dotenv').config();

class Mongo {
	private mongoose = mongoose;
	public options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: false,
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: 500,
		connectTimeoutMS: 10000,
		poolSize: 5,
	};

	public Init() {
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
			.connect(process.env.MONGO_DB_URI, this.options)
			.catch((err) => console.log(err));
	}
}

export { Mongo };

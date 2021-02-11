import mongoose from "mongoose";

const MongoInit = (): void => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
  };
  mongoose.connect(
    `mongodb+srv://PraveshK:${process.env.MONGO_DB_PASSWORD}@ultimatum.5xc7g.mongodb.net/test`,
    options
  );
  mongoose.connection.on("connected", () => {
    console.log("Database has been connected.");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Database has been disconnected.");
  });
  mongoose.connection.on("error", (err) => {
    console.error(`Error: ${err.stack}`);
  });
  mongoose.Promise = global.Promise;
};

export default MongoInit;

import Ultimatum from "../../discord";
import { Run } from "../../interfaces/Event";
import MongoInit from "../../functions/Mongoose";

export const run: Run = async (client: typeof Ultimatum) => {
  MongoInit();
  client.user?.setPresence({
    activity: {
      name: "First time owo",
    },
    status: "dnd",
  });
  console.log(`${client.user?.tag} has logged on.`);
};

export const name: string = "ready";

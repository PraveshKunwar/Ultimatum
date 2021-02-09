import Ultimatum from "../../discord";
import { Run } from "../../interfaces/Event";

export const run: Run = async (client: typeof Ultimatum) => {
  client.user?.setPresence({
    activity: {
      name: "First time owo",
    },
    status: "dnd",
  });
  console.log(`${client.user?.tag} has logged on.`);
};

export const name: string = "ready";

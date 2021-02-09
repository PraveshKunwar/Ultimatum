import Ultimatum from "../../discord";
import { Run } from "../../interfaces/Event";
import { Message } from "discord.js";
import { CmdCollection } from "../../discord";

export const run: Run = async (client: typeof Ultimatum, message: Message) => {
  const prefix = "ult!";
  if (
    message.author.bot ||
    !message.guild ||
    message.content.startsWith(prefix)
  )
    return;
  const args: string[] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd: any = args.shift();
  const command = CmdCollection.get(cmd);
  if (!command) return;
  else {
    command.run(client, message, args);
  }
};

export const name: string = "message";

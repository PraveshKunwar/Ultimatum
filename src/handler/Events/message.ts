import { Client } from "discord.js";

import { Message } from "discord.js";
import { Run } from "../../interfaces/Event";
import { Command } from "../../interfaces/Command";
import Ultimatum from "../../discord";

export const run: Run = async (client, message: Message) => {
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
    .split(/ + /g);
  const cmd: any = args.shift();
  const command = client.Commands.get(cmd);
  if (!command) return;
  command
    .run(client, message, args)
    .catch((r) => message.channel.send(`Error: ${r}`));
};

export const name: string = "message";

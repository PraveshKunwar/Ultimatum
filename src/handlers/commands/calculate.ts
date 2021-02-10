import { Run } from "../../interfaces/Command";
import { Message, MessageEmbed } from "discord.js";
import ErrorEmbed from "../../errors/ErrorEmbed";

export const run: Run = async (client, message, args) => {
  const equation: string = args[1];
  const embed = new MessageEmbed().setAuthor("asd").setDescription("asd");
  console.log(equation);
  if (!equation) {
    ErrorEmbed(
      `
    Please make sure you are using the calculator correctly!
    Ex: ult!calculate 3+3
    `,
      client,
      message
    );
  }
};
export const name: string = "calculate";

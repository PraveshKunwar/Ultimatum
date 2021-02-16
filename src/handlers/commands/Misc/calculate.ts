import { Run } from '../../../interfaces/Command';
import { Message, MessageEmbed } from 'discord.js';
import ErrorEmbed from '../../../errors/ErrorEmbed';
import BlockQuote from '../../../util/BlockQuote';
import Colors from '../../../util/Colors';
const math = require('mathjs');

export const run: Run = async (client, message, args) => {
	/* const equation = args;
  console.log(message.content);
  console.log(args);
  if (!equation) {
    const ArgsError = ErrorEmbed(
      `Please specify an equation for me to calculate!
    **Examples:**
    ${BlockQuote(
      "js",
      `
    ult!Calculate 3+3
    ult!Calculate sin30
    ult!Calculate 3^3
    `
    )}
    `,
      client,
      message
    );
    message.channel.send(ArgsError);
  } else {
    const OutputEmbed = new MessageEmbed()
      .setAuthor(client.user?.tag)
      .setTimestamp()
      .setColor(Colors.successful)
      .setFooter(
        `↠↠ User: ${message.author?.tag}`,
        message.author.displayAvatarURL()
      )
      .setTitle("↠↠ Calculation processed!")
      .setDescription(`↠↠ Input: **${equation}**\n ↠↠ Output: ${BlockQuote(
      "js",
      math.evaluate(`${equation}`)
    )} 
  `);
    message.channel.send(OutputEmbed); *
  }*/
};
export const name: string = 'calculate';

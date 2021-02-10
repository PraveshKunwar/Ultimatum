import { MessageEmbed, Client, Message } from "discord.js";

const ErrorEmbed = (
  err: string,
  client: Client,
  message: Message,
  external?: string | any
) => {
  const Embed: MessageEmbed = new MessageEmbed()
    .setAuthor(client.user?.tag, client.user?.displayAvatarURL())
    .setTitle("↠↠ Recieved an error:")
    .setDescription(`↠↠ Error: **${err}**`)
    .setColor("#7d2323")
    .setTimestamp()
    .setFooter(
      `↠↠ User: ${message.author?.tag}`,
      message.author.displayAvatarURL()
    );
  message.channel.send(Embed);
};
export default ErrorEmbed;

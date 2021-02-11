//found on stackoverflow
//link: https://stackoverflow.com/questions/44284092/discord-js-send-message-as-code-block

const BlockQuote = (lang: string, text: string | number) => {
  return `\`\`\`${lang}\n${text}\`\`\``;
};

export default BlockQuote;

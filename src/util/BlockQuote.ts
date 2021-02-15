//found on stackoverflow
//link: https://stackoverflow.com/questions/44284092/discord-js-send-message-as-code-block

const BlockQuote = (text: string | number, lang?: string) => {
	return `\`\`\`${lang}\n${text}\`\`\``;
};

export default BlockQuote;

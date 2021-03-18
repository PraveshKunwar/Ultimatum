//found on stackoverflow
//link: https://stackoverflow.com/questions/44284092/discord-js-send-message-as-code-block

export const BlockQuote = (text: string | number, lang?: string) => {
	return `\`\`\`${lang}\n${text}\`\`\``;
};

export const OneQuote = (text: string | number) => {
	return `\`${text}\``;
};

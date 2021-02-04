"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const run = async (client, message) => {
    const prefix = "ult!";
    if (message.author.bot || !message.guild || message.content.startsWith(prefix))
        return;
};
exports.run = run;
exports.name = "message";
';

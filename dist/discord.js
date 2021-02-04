"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
class Ultimatum extends discord_js_1.Client {
    constructor() {
        super();
        this.Commands = new discord_js_1.Collection();
        this.Events = new discord_js_1.Collection();
        this.client = new discord_js_1.Client({
            disableMentions: "all",
            fetchAllMembers: true,
        });
    }
    run(config) {
        this.config = config;
        this.client.login(config);
        fs_1.readdir("./src/handler/Commands", (err, files) => {
            console.log(files);
            err ? console.log(err) : false;
            if (files.length < 0) {
                return console.log("No commands");
            }
            else {
                files.forEach((f) => {
                    const cmdName = f.split(".")[0];
                    const props = require(`./handler/Commands/${f}`);
                    this.Commands.set(cmdName, props);
                });
            }
        });
        fs_1.readdir("./src/handler/Events", (err, files) => {
            err ? console.log(err) : false;
            files.forEach((f) => {
                const evtName = f.split(".")[0];
                const props = require(`./handler/Events/${f}`);
                this.Events.set(evtName, props);
                this.client.on(evtName, props.bind(null, this.client));
            });
        });
    }
}
exports.default = Ultimatum;

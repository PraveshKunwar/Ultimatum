import { Client, Message, Collection } from "discord.js";
import { readdir } from "fs";

import { Command } from "./interfaces/Command";
import { Event } from "./interfaces/Event";
import { Token } from "./interfaces/Token";

class Ultimatum extends Client {
  constructor() {
    super();
    this.client = new Client({
      disableMentions: "all",
      fetchAllMembers: true,
    });
  }
  public client: Client;
  public config: any;
  public Commands: Collection<string, Command> = new Collection();
  public Events: Collection<string, Event> = new Collection();
  public run(config: string): void {
    this.config = config;
    this.client.login(config);

    readdir("./src/handler/Commands", (err: any, files: any[]) => {
      console.log(files);
      err ? console.log(err) : false;
      if (files.length < 0) {
        return console.log("No commands");
      } else {
        files.forEach((f: string) => {
          const cmdName: string = f.split(".")[0];
          const props = require(`./handler/Commands/${f}`);
          this.Commands.set(cmdName, props);
        });
      }
    });

    readdir("./src/handler/Events", (err: any, files: any[]) => {
      err ? console.log(err) : false;
      files.forEach((f: string) => {
        const evtName: string = f.split(".")[0];
        const props = require(`./handler/Events/${f}`);
        this.Events.set(evtName, props);
        this.client.on(evtName, props.bind(null, this.client));
      });
    });
  }
}

export default Ultimatum;

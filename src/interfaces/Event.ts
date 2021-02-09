import Ultimatum from "../discord";

export interface Run {
  (client: typeof Ultimatum, ...args: string[]): Promise<void>;
}

export interface Event {
  name: string;
  run: Run;
}

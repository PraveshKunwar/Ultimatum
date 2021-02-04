import Ultimatum from "../discord";

export interface Run {
  (client: Ultimatum, ...args: string[]): Promise<void>;
}

export interface Event {
  name: string;
  run: Run;
}

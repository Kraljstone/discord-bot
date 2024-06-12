// src/ExtendedClient.ts
import { Client, Collection } from 'discord.js';
import { Command } from './types/command';

// Define an interface for commands

// Extend the Client class to include a commands property
export class ExtendedClient extends Client {
  commands: Collection<string, Command>;

  constructor(options: any) {
    super(options);
    this.commands = new Collection();
  }
}

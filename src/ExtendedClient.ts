// src/ExtendedClient.ts
import { Client, Collection } from 'discord.js';
import type { CommandInteraction, SlashCommandBuilder } from 'discord.js';

// Define an interface for commands
export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

// Extend the Client class to include a commands property
export class ExtendedClient extends Client {
  commands: Collection<string, Command>;

  constructor(options: any) {
    super(options);
    this.commands = new Collection();
  }
}

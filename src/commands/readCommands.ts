import fs from 'fs';
import path from 'path';
import { Command } from '../types/command';
import { ExtendedClient } from '../ExtendedClient';
import { GatewayIntentBits } from 'discord.js';

// Create a new instance of ExtendedClient
const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds],
});

// Function to recursively read commands from directories
export const readCommands = (directory: string) => {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      readCommands(filePath);
    } else if (file.endsWith('.js')) {
      const command: Command = require(filePath);
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
};

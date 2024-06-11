// Import the necessary discord.js classes
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { token } from './config.json';
import { ExtendedClient } from './ExtendedClient';

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
}) as ExtendedClient;
client.commands = new Collection();

// Function to recursively read commands from directories
const readCommands = (directory: string) => {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      readCommands(filePath);
    } else if (file.endsWith('.js')) {
      const command = require(filePath);
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

const commandsPath = path.join(__dirname, 'commands');
readCommands(commandsPath);

// Log in to Discord with your client's token
client.login(token).catch(console.error);

client.on('interactionCreate', (interaction) => {
  console.log(interaction);
});

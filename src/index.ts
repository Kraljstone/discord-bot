import { GatewayIntentBits, Interaction } from 'discord.js';
import path from 'path';
import { token } from './config.json';
import { ExtendedClient } from './ExtendedClient';
import { readCommands } from './commands/readCommands';

// Create a new instance of ExtendedClient
const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds],
});

// Read commands from the specified directory
const commandsPath = path.join(__dirname, 'commands');
readCommands(commandsPath);

// Log in to Discord with your client's token
client.login(token).catch(console.error);

// Handle interactionCreate events
client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
});

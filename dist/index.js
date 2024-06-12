"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_json_1 = require("./config.json");
const ExtendedClient_1 = require("./ExtendedClient");
// Create a new instance of ExtendedClient
const client = new ExtendedClient_1.ExtendedClient({
    intents: [discord_js_1.GatewayIntentBits.Guilds],
});
// Function to recursively read commands from directories
const readCommands = (directory) => {
    const files = fs_1.default.readdirSync(directory);
    for (const file of files) {
        const filePath = path_1.default.join(directory, file);
        if (fs_1.default.statSync(filePath).isDirectory()) {
            readCommands(filePath);
        }
        else if (file.endsWith('.js')) {
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
};
console.log(readCommands, 'readCommands');
// Read commands from the specified directory
const commandsPath = path_1.default.join(__dirname, 'commands');
readCommands(commandsPath);
// Log in to Discord with your client's token
client.login(config_json_1.token).catch(console.error);
// Handle interactionCreate events
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
        else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    }
});

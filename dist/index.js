"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the necessary discord.js classes
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_json_1 = require("./config.json");
// Extend the Client class to include a commands collection
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds],
});
client.commands = new discord_js_1.Collection();
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
const commandsPath = path_1.default.join(__dirname, 'commands');
readCommands(commandsPath);
// Log in to Discord with your client's token
client.login(config_json_1.token).catch(console.error);

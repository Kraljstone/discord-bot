"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the necessary discord.js classes
const discord_js_1 = require("discord.js");
// Dynamically import JSON configuration
const config_json_1 = require("./config.json");
// Create a new client instance
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds],
});
// When the client is ready, run this code (only once).
client.once(discord_js_1.Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
// Log in to Discord with your client's token
client.login(config_json_1.token).catch(console.error);

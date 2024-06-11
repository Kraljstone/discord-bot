// Import the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from 'discord.js';

// Dynamically import JSON configuration
import { token } from './config.json';

// Type alias for Client instance
type DiscordClient = InstanceType<typeof Client>;

// Create a new client instance
const client: DiscordClient = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// When the client is ready, run this code (only once).
client.once(
  Events.ClientReady,
  (readyClient: DiscordClient & { user: { tag: string } }) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  }
);

// Log in to Discord with your client's token
client.login(token).catch(console.error);

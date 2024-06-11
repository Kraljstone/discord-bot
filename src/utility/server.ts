import { SlashCommandBuilder, CommandInteraction, Guild } from 'discord.js';

interface ServerData {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export const server: ServerData = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),
  async execute(interaction: CommandInteraction) {
    const guild: Guild | null = interaction.guild;

    if (!guild) {
      await interaction.reply('This command can only be used in a server.');
      return;
    }

    await interaction.reply(`This server is ${guild.name} and has ${guild.memberCount} members.`);
  },
};

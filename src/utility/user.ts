import { SlashCommandBuilder, CommandInteraction, GuildMember } from 'discord.js';

interface UserData {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export const user: UserData = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'),
  async execute(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember;
    
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${member.joinedAt}.`
    );
  },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const discord_js_1 = require("discord.js");
exports.server = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server.'),
    async execute(interaction) {
        const guild = interaction.guild;
        if (!guild) {
            await interaction.reply('This command can only be used in a server.');
            return;
        }
        await interaction.reply(`This server is ${guild.name} and has ${guild.memberCount} members.`);
    },
};

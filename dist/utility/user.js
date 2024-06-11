"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const discord_js_1 = require("discord.js");
exports.user = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        const member = interaction.member;
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${member.joinedAt}.`);
    },
};

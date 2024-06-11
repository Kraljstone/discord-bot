"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const discord_js_1 = require("discord.js");
exports.server = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server.'),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const guild = interaction.guild;
            if (!guild) {
                yield interaction.reply('This command can only be used in a server.');
                return;
            }
            yield interaction.reply(`This server is ${guild.name} and has ${guild.memberCount} members.`);
        });
    },
};

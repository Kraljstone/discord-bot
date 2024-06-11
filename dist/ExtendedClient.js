"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
// src/ExtendedClient.ts
const discord_js_1 = require("discord.js");
// Extend the Client class to include a commands property
class ExtendedClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
    }
}
exports.ExtendedClient = ExtendedClient;

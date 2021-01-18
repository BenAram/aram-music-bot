"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const message = new discord_js_1.MessageEmbed()
    .setColor('#f55139')
    .setTitle('Utilidades')
    .addFields({
    name: 'dizer "texto"',
    value: 'Faz com que o bot diga qualquer coisa'
}, {
    name: 'novidades',
    value: 'Mostra a você as novidades da última versão lançado do aplicativo android.'
});
exports.default = message;

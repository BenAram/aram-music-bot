"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const message = new discord_js_1.MessageEmbed()
    .setColor('#f55139')
    .setTitle('Administração')
    .addFields({
    name: 'bem-vindo "canal de texto"',
    value: 'Muda o canal de boas vindas do servidor'
}, {
    name: 'mensagens-deletadas "canal de texto"',
    value: 'Muda o canal de mensagens deletadas do servidor'
}, {
    name: 'limpar "número de mensagens para deletar"',
    value: 'Deleta mensagens para limpar o chat'
}, {
    name: 'prefixo "novo prefixo"',
    value: 'Muda o prefixo do servidor para um novo'
}, {
    name: 'banir "usuário" "motivo"',
    value: 'Bane um usuário com determinado motivo.'
}, {
    name: 'expulsar "usuário" "motivo"',
    value: 'Expulsa um usuário com determinado motivo.'
});
exports.default = message;

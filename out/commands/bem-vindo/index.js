"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../services/db");
async function MensagensDeletadas(msg) {
    try {
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            msg.reply('Você não tem permissão para isto');
        }
        const newChannel = msg.mentions.channels.first();
        if (!newChannel) {
            msg.reply('Por favor, informe um canal de texto.');
        }
        const server = await db_1.Server.findOne({ id: msg.guild.id });
        if (!server) {
            return msg.reply('Um erro ocorreu');
        }
        server.messagesWelcome = newChannel.id;
        server.save();
        msg.reply(`Canal de boas-vindas mudado com sucesso para ${newChannel}`);
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.reply('Um erro ocorreu');
    }
}
exports.default = MensagensDeletadas;

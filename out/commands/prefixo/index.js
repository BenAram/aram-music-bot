"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../services/db");
async function Prefixo(msg, newPrefix) {
    if (!msg.member.hasPermission('ADMINISTRATOR')) {
        return msg.reply('você não tem permissão para fazer isto.');
    }
    try {
        if (!newPrefix) {
            return msg.reply('Por favor, informe o novo prefixo.');
        }
        const server = await db_1.Server.findOne({ id: msg.guild.id });
        server.prefix = newPrefix;
        server.save();
        msg.reply(`Prefixo mudado para ${newPrefix}`);
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.channel.send('Um erro ocorreu');
    }
}
exports.default = Prefixo;

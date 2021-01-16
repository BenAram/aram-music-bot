"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../services/db");
async function Limpar(msg, content) {
    try {
        if (!msg.member.hasPermission('ADMINISTRATOR') && !msg.member.hasPermission('MANAGE_MESSAGES')) {
            return msg.reply('você não tem permissão para isto');
        }
        if (isNaN(content)) {
            return msg.reply('Coloque um número válido');
        }
        const server = await db_1.Server.findOne({ id: msg.guild.id });
        server.channelNotDeleted = `${msg.channel.id}`;
        server.save();
        let numberToDelete = parseInt(content);
        const fetched = await msg.channel.messages.fetch({ limit: numberToDelete + 1 });
        await msg.channel
            .bulkDelete(fetched);
        msg.reply(`${numberToDelete} mensage${numberToDelete > 1 ? 'ns' : 'm'} apagada${numberToDelete > 1 ? 's' : ''}`);
        await db_1.Server.findOneAndUpdate({ id: msg.guild.id }, { $set: { channelNotDeleted: '' } });
    }
    catch (err) {
        msg.reply('Não foi possível deletar as mensagens');
    }
}
exports.default = Limpar;

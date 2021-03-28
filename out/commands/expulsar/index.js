"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const db_1 = require("../../services/db");
async function Expulsar(msg) {
    try {
        if (!msg.member.hasPermission('KICK_MEMBERS') || !msg.member.hasPermission('ADMINISTRATOR') && msg.member.id != '609521770097278976') {
            return msg.reply('você não tem permissão para expulsar um usuário.');
        }
        const member = msg.mentions.users.first();
        if (!member) {
            return msg.reply('por favor, informe um usuário');
        }
        if (!msg.guild.member(member).kickable) {
            return msg.reply('não posso expulsar este usuário');
        }
        if (!msg.guild.id) {
            return;
        }
        const server = await db_1.Server.findOne({ id: msg.guild.id });
        let reason = msg.content.replace(`${server.prefix || config_1.default.prefix}expulsar `, '').replace(`${server.prefix || config_1.default.prefix}kick `, '');
        reason = reason.slice(reason.indexOf(' ') + 1, reason.length);
        member.send(`Você foi expulso do servidor ${msg.guild.name} pelo motivo: ${reason}`);
        setTimeout(() => {
            msg.guild.member(member).kick();
            msg.reply(`Usuário ${member} expulso com sucesso pelo motivo: ${reason}`);
        }, 500);
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.channel.send('Não foi possível banir este usuário');
    }
}
exports.default = Expulsar;

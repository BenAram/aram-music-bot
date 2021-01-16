"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const db_1 = require("../../services/db");
async function Banir(msg) {
    try {
        if (!msg.member.hasPermission('BAN_MEMBERS') || !msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.reply('você não tem permissão para banir um usuário.');
        }
        if (!msg.guild.id) {
            return;
        }
        const member = msg.mentions.users.first();
        if (!member) {
            return msg.reply('por favor, informe um usuário');
        }
        if (!msg.guild.member(member).bannable) {
            return msg.reply('não posso banir este usuário');
        }
        const server = await db_1.Server.findOne({ id: msg.guild.id });
        let reason = msg.content.replace(`${server.prefix || config_1.default.prefix}banir `, '').replace(`${server.prefix || config_1.default.prefix}ban `, '');
        reason = reason.slice(reason.indexOf(' ') + 1, reason.length);
        member.send(`Você foi banido do servidor ${msg.guild.name} pelo motivo: ${reason}`);
        setTimeout(() => {
            msg.guild.member(member).ban();
            msg.reply(`Usuário ${member} banido com sucesso pelo motivo: ${reason}`);
        }, 500);
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.channel.send('Não foi possível banir este usuário');
    }
}
exports.default = Banir;

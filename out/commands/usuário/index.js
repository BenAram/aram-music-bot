"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const api_1 = __importDefault(require("../../services/api"));
const client_1 = __importDefault(require("../../services/client"));
const config_1 = __importDefault(require("../../config"));
const treatTime_1 = __importDefault(require("../../utils/treatTime"));
async function Usuário(msg, content) {
    try {
        if (isNaN(content)) {
            return msg.reply('Coloque um id válido.');
        }
        const { data: user } = await api_1.default.get(`/user/${content}`);
        if (user.error) {
            msg.channel.send(user.message);
        }
        else {
            const message = new discord_js_1.MessageEmbed()
                .setColor('#3f48cc')
                .setTitle(user.name)
                .setURL(`${client_1.default}/app/user/${encodeURIComponent(content)}`)
                .addField('Data de criação', treatTime_1.default(user.createdAt))
                .addFields({
                name: `Música${user.musics.length > 1 ? 's' : ''}`,
                value: user.musics.length,
                inline: true
            }, {
                name: `Playlist${user.playlists.length > 1 ? 's' : ''}`,
                value: user.playlists.length,
                inline: true
            }, {
                name: `Amigo${user.friends.length > 1 ? 's' : ''}`,
                value: user.friends.length,
                inline: true
            });
            if (user.avatar) {
                message.setThumbnail(`${config_1.default.url}/avatar/${encodeURIComponent(user.avatar)}`);
            }
            msg.channel.send(message);
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.channel.send('Não foi possível consultar o usuário.');
    }
}
exports.default = Usuário;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const api_1 = __importDefault(require("../../services/api"));
const client_1 = __importDefault(require("../../services/client"));
const config_1 = __importDefault(require("../../config"));
async function Playlist(msg, content) {
    try {
        const { data } = await api_1.default.get(`/playlists/${content}`);
        if (data.error) {
            msg.channel.send(data.message);
        }
        else {
            const playlist = data;
            const message = new discord_js_1.MessageEmbed()
                .setColor('#3f48cc')
                .setTitle(playlist.name)
                .setURL(`${client_1.default}/app/playlist/${content}`)
                .setAuthor(playlist.owner, '', `${client_1.default}/app/user/${playlist.owner_id}`)
                .addField(playlist.musics.length, `Música${playlist.musics.length > 1 ? 's' : ''}`);
            if (playlist.musics.length > 0) {
                message.setImage(`${config_1.default.url}/music-bg/${encodeURIComponent(playlist.musics[0].music_background)}`);
            }
            msg.channel.send(message);
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.channel.send('Não foi possível consultar a playlist');
    }
}
exports.default = Playlist;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../../services/api"));
async function Playlist(msg, content) {
    try {
        const { data } = await api_1.default.get(`/playlists/${content}`);
        if (data.error) {
            msg.channel.send(data.message);
        }
        else {
            const playlist = data;
            msg.channel.send(`
${playlist.name}
**Feita por:** ${playlist.owner}

**${playlist.musics.length}** Música${playlist.musics.length > 1 ? 's' : ''}
Ouça aqui: http://music.benaram.com/app/playlist/${content}
        `);
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.channel.send('Não foi possível consultar a playlist');
    }
}
exports.default = Playlist;

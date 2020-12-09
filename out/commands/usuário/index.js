"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../../services/api"));
const treatTime_1 = __importDefault(require("../../utils/treatTime"));
async function Usuário(msg, content) {
    try {
        const { data } = await api_1.default.get(`/user/${content}`);
        if (data.error) {
            msg.channel.send(data.message);
        }
        else {
            msg.channel.send(`
**Nome:** ${data.name}
**Perfil criado em:**
${treatTime_1.default(data.createdAt)}

${data.musics.length} Música${data.musics.length > 1 ? 's' : ''}
${data.playlists.length} Playlist${data.playlists.length > 1 ? 's' : ''}
${data.friends.length} Amigo${data.friends.length > 1 ? 's' : ''}

Veja o perfil aqui: http://music.benaram.com/app/user/${content}
            `);
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.channel.send('Não foi possível consultar o usuário.');
    }
}
exports.default = Usuário;

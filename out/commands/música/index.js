"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = require("jimp");
const api_1 = __importDefault(require("../../services/api"));
const config_1 = __importDefault(require("../../config"));
const db_1 = require("../../services/db");
const removeSpaces_1 = __importDefault(require("../../utils/removeSpaces"));
const treatMusic_1 = __importDefault(require("../../utils/treatMusic"));
async function Música(msg, content) {
    try {
        const { data } = await api_1.default.get(`/music/${content}`);
        const music = data;
        const server = await db_1.Server.findOne({ id: msg.guild.id });
        let prefix = config_1.default.prefix;
        if (server) {
            prefix = server.prefix;
        }
        if (data.error) {
            msg.channel.send(data.message);
        }
        else {
            const image = await jimp_1.read(`${config_1.default.url}/music-bg/${removeSpaces_1.default(music.music_background)}`);
            image.write('music.png');
            msg.channel.send(treatMusic_1.default(music, content, prefix), { files: ['music.png'] });
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.channel.send('Não foi possível consultar a música');
    }
}
exports.default = Música;

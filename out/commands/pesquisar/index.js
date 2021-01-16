"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../../services/api"));
const config_1 = __importDefault(require("../../config"));
const db_1 = require("../../services/db");
const treatMusic_1 = __importDefault(require("../../utils/treatMusic"));
async function Pesquisar(msg, content) {
    try {
        const { data } = await api_1.default.get(`/audio?q=${content}`);
        const server = await db_1.Server.findOne({ id: msg.guild.id });
        let prefix = config_1.default.prefix;
        if (server) {
            prefix = server.prefix;
        }
        let music;
        if (data.musicsName[0]) {
            music = data.musicsName[0];
        }
        else if (data.musicsDescription[0]) {
            music = data.musicsDescription[0];
        }
        else if (data.musicsKeywords[0]) {
            music = data.musicsKeywords[0];
        }
        if (music) {
            const message = await msg.channel.send(treatMusic_1.default(music, '', prefix));
            await message.react('▶️');
            const collector = message.createReactionCollector((reaction, user) => {
                if (user.id !== msg.member.id) {
                    return false;
                }
                if (reaction._emoji.name !== '▶️') {
                    return false;
                }
                return true;
            });
            collector.on('collect', () => {
                if (!msg.member.voice.channel) {
                    msg.reply('Você não está em um canal de voz');
                }
                msg.member.voice.channel.join();
                msg.channel.send(`${prefix}tocar --id=${music.id}`);
            });
        }
        else {
            msg.channel.send(`Não foi encontrada nenhuma música com a palavra ${content}`);
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.channel.send('Não foi possível pesquisar a música.');
    }
}
exports.default = Pesquisar;

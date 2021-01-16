"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = __importDefault(require("../config"));
const treatTime_1 = __importDefault(require("./treatTime"));
const client_1 = __importDefault(require("../services/client"));
function treatMusic(music, id, prefix) {
    const message = new discord_js_1.MessageEmbed()
        .setColor('#3f48cc')
        .setTitle(music.name)
        .setURL(`${client_1.default}/app/music/${music.id || id}`)
        .setAuthor(music.user_owner.name, `${music.user_owner.avatar ? `${config_1.default.url}/avatar/${music.user_owner.avatar}` : 'https://avatars0.githubusercontent.com/u/30473505?s=460&u=00b6ee203648603e4c746f813dfa75f106961b73&v=4'}`, `http://music.benaram.com/app/user/${music.user_owner.id}`)
        .setDescription(music.description)
        .addField('Palavras-chaves', music.keywords.join(', '))
        .addFields({
        name: 'Acessos',
        value: `${music.access}`,
        inline: true
    }, {
        name: 'Data de envio',
        value: treatTime_1.default(music.createdAt),
        inline: true
    })
        .setImage(`${config_1.default.url}/music-bg/${encodeURIComponent(music.music_background)}`);
    return message;
}
exports.default = treatMusic;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const messages_1 = __importStar(require("./messages"));
async function Ajuda(msg) {
    const embed = new discord_js_1.MessageEmbed()
        .setColor('#3f48cc')
        .setTitle('Menu de ajuda')
        .addFields({
        name: 'Administração',
        value: 'Emoji: ⚙️'
    }, {
        name: 'Utilidades',
        value: 'Emoji: 🚻'
    }, {
        name: 'Pesquisa',
        value: 'Emoji: 🔎'
    }, {
        name: 'Comandos de voz',
        value: 'Emoji: 🔊'
    });
    const message = await msg.channel.send(embed);
    messages_1.emojis.forEach(emoji => {
        message.react(emoji);
    });
    const collector = message.createReactionCollector((reaction, user) => {
        if (user.id !== msg.member.id) {
            return false;
        }
        if (reaction._emoji.name === '◀️') {
            return true;
        }
        if (!messages_1.emojis.includes(reaction._emoji.name)) {
            return false;
        }
        return true;
    });
    collector.on('collect', (reaction) => {
        if (reaction._emoji.name === '◀️') {
            message.reactions.removeAll();
            message.edit(embed);
            messages_1.emojis.forEach(emoji => {
                message.react(emoji);
            });
            return;
        }
        if (messages_1.default[reaction._emoji.name]) {
            message.reactions.removeAll();
            message.react('◀️');
            message.edit(messages_1.default[reaction._emoji.name]);
        }
    });
}
exports.default = Ajuda;

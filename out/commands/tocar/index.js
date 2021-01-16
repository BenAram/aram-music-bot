"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const api_1 = __importDefault(require("../../services/api"));
const client_1 = __importDefault(require("../../services/client"));
const config_1 = __importDefault(require("../../config"));
const db_1 = require("../../services/db");
const queue = {};
async function Tocar(msg, id, client) {
    try {
        const voiceChannel = msg.member.voice.channel;
        let music;
        let musics = [];
        let playlist = false;
        if (id.includes('--id=')) {
            let idSea = id.replace('--id=', '');
            const { data } = await api_1.default.get(`/music/${idSea}`);
            if (data.error) {
                msg.channel.send(data.message);
                return;
            }
            music = data;
        }
        if (id.includes('--playlist=')) {
            let idPlaylist = id.replace('--playlist=', '');
            const { data } = await api_1.default.get(`/playlists/${idPlaylist}`);
            if (data.error) {
                msg.channel.send(data.message);
                return;
            }
            playlist = true;
            musics = data.musics;
        }
        else {
            const { data: musics } = await api_1.default.get(`/audio?q=${id}`);
            if (musics.error) {
                msg.channel.send(musics.message);
                return;
            }
            if (musics.musicsName[0]) {
                music = musics.musicsName[0];
            }
            if (musics.musicsDescription[0]) {
                music = musics.musicsDescription[0];
            }
            if (musics.musicsKeywords[0]) {
                music = musics.musicsKeywords[0];
            }
        }
        if (!music && !playlist) {
            return;
        }
        if (!voiceChannel) {
            msg.channel.send('Precisar estar em uma sala de voz');
        }
        else {
            if (queue[msg.guild.id]) {
                if (queue[msg.guild.id][0]) {
                    if (playlist) {
                        if (!musics[0]) {
                            return msg.reply('Esta playlist não contém música');
                        }
                        msg.channel.send(`${musics.length} músicas adicionadas á fila.`);
                        musics.forEach(music => {
                            queue[msg.guild.id].push(music);
                        });
                        return;
                    }
                    queue[msg.guild.id].push(music);
                    msg.channel.send(`Música adicionada á fila: ${music.name}`);
                    return;
                }
            }
            if (playlist) {
                if (!musics[0]) {
                    return msg.reply('Esta playlist não contém música');
                }
                music = musics[0];
            }
            queue[msg.guild.id] = [music];
            if (playlist) {
                musics.forEach((music, index) => {
                    if (index === 0) {
                        return;
                    }
                    queue[msg.guild.id].push(music);
                });
            }
            if (!playlist) {
                msg.channel.send(`Tocando: ${music.name}, Pedida por: ${msg.member}`);
            }
            else {
                msg.channel.send(`Tocando ${musics.length} músicas, pedida por: ${msg.member}`);
            }
            const connection = await voiceChannel.join();
            let play = connection.play(`${config_1.default.url}/audio/${music.name_upload}`);
            const server = await db_1.Server.findOne({ id: msg.guild.id });
            if (server) {
                play.setVolume(server.volume);
            }
            let prefix = config_1.default.prefix;
            if (server) {
                prefix = server.prefix;
            }
            async function end() {
                queue[msg.guild.id].shift();
                if (queue[msg.guild.id][0]) {
                    const server = await db_1.Server.findOne({ id: msg.guild.id });
                    msg.channel.send(`**Tocando agora:** ${queue[msg.guild.id][0].name}`);
                    play = connection.play(`${config_1.default.url}/audio/${queue[msg.guild.id][0].name_upload}`);
                    play.on('finish', end);
                    if (server) {
                        play.setVolume(server.volume);
                    }
                }
                else {
                    voiceChannel.leave();
                }
            }
            async function message(msg2) {
                let prefix = config_1.default.prefix;
                if (!msg2.guild.id) {
                    return;
                }
                const server = await db_1.Server.findOne({ id: msg2.guild.id });
                if (server) {
                    prefix = server.prefix;
                }
                if (msg2.content.indexOf(prefix + 'continuar') === 0 || msg2.content.indexOf(prefix + 'continue') === 0) {
                    if (msg.guild.id === msg2.guild.id) {
                        if (!msg2.member.voice.channel) {
                            msg2.channel.send(`Você não está em uma sala de voz`);
                            return;
                        }
                        else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                            msg2.channel.send(`Você não está na mesma sala de voz`);
                            return;
                        }
                        if (msg.member.id === msg2.member.id) {
                            play.resume();
                        }
                        else {
                            msg2.channel.send('Você não pode fazer isso pois não pediu a música.');
                        }
                    }
                }
                if (msg2.content.indexOf(prefix + 'pausar') === 0 || msg2.content.indexOf(prefix + 'pause') === 0) {
                    if (msg.guild.id === msg2.guild.id) {
                        if (!msg2.member.voice.channel) {
                            msg2.channel.send(`Você não está em uma sala de voz`);
                            return;
                        }
                        else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                            msg2.channel.send(`Você não está na mesma sala de voz`);
                            return;
                        }
                        if (msg.member.id === msg2.member.id) {
                            play.pause();
                        }
                        else {
                            msg2.channel.send('Você não pode fazer isso pois não pediu a música.');
                        }
                    }
                }
                if (msg2.content.indexOf(prefix + 'volume') === 0) {
                    if (msg.guild.id === msg2.guild.id) {
                        if (!msg2.member.voice.channel) {
                            msg2.channel.send(`Você não está em uma sala de voz`);
                            return;
                        }
                        else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                            msg2.channel.send(`Você não está na mesma sala de voz`);
                            return;
                        }
                        const newVolume = msg2.content.replace(prefix + 'volume ', '');
                        if (isNaN(newVolume)) {
                            msg2.channel.send('Coloque um volume válido');
                        }
                        else {
                            const server = await db_1.Server.findOne({ id: msg2.guild.id });
                            if (server) {
                                server.volume = newVolume / 100;
                                server.save();
                            }
                            play.setVolume(newVolume / 100);
                        }
                    }
                }
                if (msg2.content.indexOf(prefix + 'pular') === 0 || msg2.content.indexOf(prefix + 'skip') === 0) {
                    if (msg.guild.id === msg2.guild.id) {
                        if (!msg2.member.voice.channel) {
                            msg2.channel.send(`Você não está em uma sala de voz`);
                            return;
                        }
                        else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                            msg2.channel.send(`Você não está na mesma sala de voz`);
                            return;
                        }
                        queue[msg2.guild.id].shift();
                        if (queue[msg2.guild.id][0]) {
                            const server = await db_1.Server.findOne({ id: msg2.guild.id });
                            play = connection.play(`${config_1.default.url}/audio/${queue[msg2.guild.id][0].name_upload}`);
                            play.on('finish', end);
                            if (server) {
                                play.setVolume(server.volume);
                            }
                            msg2.channel.send(`**Pulando para a próxima música:** ${queue[msg2.guild.id][0].name}`);
                        }
                        else {
                            voiceChannel.leave();
                            msg2.channel.send('Não há mais músicas para tocar.');
                        }
                    }
                }
                if (msg2.content.indexOf(prefix + 'fila') === 0 || msg2.content.indexOf(prefix + 'queue') === 0) {
                    if (queue[msg.guild.id]) {
                        if (!msg2.member.voice.channel) {
                            msg2.channel.send(`Você não está em uma sala de voz`);
                            return;
                        }
                        else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                            msg2.channel.send(`Você não está na mesma sala de voz`);
                            return;
                        }
                        if (queue[msg.guild.id][0]) {
                            const message = new discord_js_1.MessageEmbed()
                                .setColor('#3f48cc');
                            queue[msg.guild.id].forEach((music, index) => {
                                if (index <= 0) {
                                    message.addField(`Música atual: ${music.name}`, `${client_1.default}/app/music/${music.id}`);
                                }
                                else {
                                    message.addField(`${index} | ${music.name}`, `${client_1.default}/app/music/${music.id}`);
                                }
                            });
                            msg2.channel.send(message);
                        }
                        else {
                            msg2.channel.send('Não há fila nesse servidor.');
                        }
                    }
                    else {
                        msg.channel.send('Não há fila nesse servidor.');
                    }
                }
                if (msg2.content.indexOf(prefix + 'sair') === 0 || msg2.content.indexOf(prefix + 'leave') === 0) {
                    if (!msg2.member.voice.channel) {
                        msg2.channel.send(`Você não está em uma sala de voz`);
                        return;
                    }
                    else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                        msg2.channel.send(`Você não está na mesma sala de voz`);
                        return;
                    }
                    voiceChannel.leave();
                }
                if (msg2.content.indexOf(prefix + 'tocando') === 0 || msg2.content.indexOf(prefix + 'playing') === 0) {
                    msg2.channel.send(`Tocando: ${queue[msg2.guild.id][0].name}`);
                }
            }
            connection.on('disconnect', () => {
                queue[msg.guild.id] = [];
                client.off('message', message);
            });
            play.on('finish', end);
            client.on('message', message);
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.channel.send('Um erro ocorreu.');
    }
}
exports.default = Tocar;
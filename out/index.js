"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const jimp_1 = require("jimp");
const config_1 = __importDefault(require("./config"));
const commands_1 = __importDefault(require("./commands"));
const db_1 = require("./services/db");
const client = new discord_js_1.Client();
let statusMode = 0;
let statusMax = 2;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(() => {
        switch (statusMode) {
            case 0:
                client.user.setActivity({ name: 'https://aram.app.br', type: 'PLAYING' });
                break;
            case 1:
                client.user.setActivity({ name: '?ajuda', type: 'LISTENING' });
                break;
            case 2:
                client.user.setActivity({ name: `Estou em ${client.guilds.cache.size} servidores`, type: 'PLAYING' });
        }
        if (statusMode >= statusMax) {
            statusMode = 0;
        }
        else {
            statusMode++;
        }
    }, 10000);
});
client.on('channelDelete', async (channelDeleted) => {
    try {
        if (channelDeleted.type !== 'text') {
            return;
        }
        const channel = channelDeleted;
        const server = await db_1.Server.findOne({ id: channel.guild.id });
        if (!server) {
            return;
        }
        if (server.messagesWelcome) {
            if (server.messagesWelcome == channel.id) {
                server.messagesWelcome = '';
                server.save();
            }
        }
        if (server.messagesDeleted) {
            if (server.messagesDeleted == channel.id) {
                server.messagesDeleted = '';
                server.save();
            }
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
    }
});
client.on('guildCreate', async (guild) => {
    try {
        const channels = guild.channels.cache.filter(channel => channel.type === 'text');
        const channel = channels.first();
        const invite = channel.createInvite({
            maxAge: Infinity,
            maxUses: Infinity,
            reason: 'Convite',
            temporary: false,
            unique: false
        });
        await new db_1.Server({
            id: guild.id,
            name: guild.name,
            volume: 1,
            prefix: config_1.default.prefix,
            invite: (await invite).url
        }).save();
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        guild.leave();
    }
});
client.on('guildMemberAdd', async (member) => {
    try {
        const server = await db_1.Server.findOne({ id: parseInt(member.guild.id) });
        if (server) {
            if (server.messagesWelcome) {
                const channel = member.guild.channels.cache.find(channel => channel.id == server.messagesWelcome);
                if (!channel) {
                    return;
                }
                const avatar = await jimp_1.read(member.user.displayAvatarURL().replace('webp', 'png'));
                const background = await jimp_1.read('background.png');
                const mask = await jimp_1.read('mask.png');
                const font = await jimp_1.loadFont(jimp_1.FONT_SANS_32_BLACK);
                avatar.resize(130, 130);
                mask.resize(130, 130);
                avatar.mask(mask, 0, 0);
                background.print(font, 170, 175, member.user.username);
                background.composite(avatar, 40, 90).write('welcome.png');
                channel.send(`${member}`, { files: ['welcome.png'] });
            }
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
    }
});
client.on('guildDelete', async (guild) => {
    try {
        await db_1.Server.findOneAndDelete({ id: guild.id });
    }
    catch (err) {
        console.error(`Erro: ${err}`);
    }
});
client.on('guildUpdate', async (oldGuild, guild) => {
    try {
        const server = await db_1.Server.findOne({ id: oldGuild.id });
        if (!server) {
            return;
        }
        if (server.name !== oldGuild.name) {
            server.name = guild.name;
            server.save();
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
    }
});
client.on('messageDelete', async (msg) => {
    try {
        const server = await db_1.Server.findOne({ id: parseInt(msg.guild.id) });
        if (server) {
            if (msg.content.includes(`${server.prefix}dizer`) || msg.content.includes(`${server.prefix}say`)) {
                return;
            }
            if (server.messagesDeleted) {
                if (server.channelNotDeleted == msg.channel.id) {
                    return;
                }
                const channel = msg.guild.channels.cache.find(channel => channel.id == server.messagesDeleted);
                if (channel) {
                    channel.send(`${msg.member} apagou a seguinte mensagem: ${msg.content}`);
                }
            }
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
    }
});
client.on('message', async (msg) => {
    try {
        const server = await db_1.Server.findOne({ id: msg.guild.id });
        let prefix = config_1.default.prefix;
        if (server) {
            prefix = server.prefix;
        }
        let content = msg.content;
        if (content.indexOf(prefix) === 0) {
            content = content.replace(prefix, '');
            let command = '';
            let param = '';
            if (content.includes(' ')) {
                const contentArray = content.split(' ');
                command = contentArray[0];
                param = contentArray.slice(1, contentArray.length).join(' ');
            }
            else {
                command = content;
            }
            if (commands_1.default[command]) {
                commands_1.default[command](msg, param, client);
            }
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
    }
});
client.login(config_1.default.token);

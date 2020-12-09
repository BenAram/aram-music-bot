import { Client } from 'discord.js'
import { read, loadFont, FONT_SANS_32_BLACK } from 'jimp'

import config from './config'

import commands from './commands'

import { Server } from './services/db'

const client = new Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})
client.on('guildCreate', async (guild) => {
    try {
        await new Server({
            id: guild.id,
            name: guild.name,
            volume: 1,
            prefix: config.prefix
        }).save()
    } catch(err) {
        console.error(`Erro: ${err}`)
        guild.leave()
    }
})
client.on('guildMemberAdd', async (member) => {
    try {
        const server: any = await Server.findOne({ id: parseInt(member.guild.id) })
        if (server) {
            if (server.messagesWelcome) {
                const channel: any = member.guild.channels.cache.find(channel => channel.id == server.messagesWelcome)
                if (!channel) {
                    return
                }
                const avatar = await read(member.user.displayAvatarURL().replace('webp', 'png'))
                const background = await read('background.png')
                const mask = await read('mask.png')
                const font = await loadFont(FONT_SANS_32_BLACK)

                avatar.resize(130, 130)
                mask.resize(130, 130)
                avatar.mask(mask, 0, 0)

                background.print(font, 170, 175, member.user.username)
                background.composite(avatar, 40, 90).write('welcome.png')

                channel.send('', { files: ['welcome.png'] })
            }
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
    }
})
client.on('guildDelete', async (guild) => {
    try {
        await Server.findOneAndDelete({ id: guild.id })
    } catch(err) {
        console.error(`Erro: ${err}`)
    }
})
client.on('messageDelete', async (msg) => {
    try {
        const server: any = await Server.findOne({ id: parseInt(msg.guild.id) })
        if (server) {
            if (msg.content.includes(`${server.prefix}dizer`) || msg.content.includes(`${server.prefix}say`)) {
                return
            }
            if (server.messagesDeleted) {
                const channel: any = msg.guild.channels.cache.find(channel => channel.id == server.messagesDeleted)
                if (channel) {
                    channel.send(`${msg.member} apagou a seguinte mensagem: ${msg.content}`)
                }
            }
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
    }
})
client.on('message', async (msg) => {
    try {
        const server: any = await Server.findOne({ id: msg.guild.id })
        
        let prefix: string = config.prefix
        if (server) {
            prefix = server.prefix
        }

        let content: string = msg.content
        if (content.indexOf(prefix) === 0) {
            content = content.replace(prefix, '')
            let command: string = ''
            let param: string = ''
            if (content.includes(' ')) {
                const contentArray = content.split(' ')
                command = contentArray[0]
                param = contentArray.slice(1, contentArray.length).join(' ')
            } else {
                command = content
            }
            if (commands[command]) {
                commands[command](msg, param, client)
            }
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
    }
})

client.login(config.token)
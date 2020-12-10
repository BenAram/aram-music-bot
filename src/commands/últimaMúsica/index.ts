import { Message, MessageReaction, ClientUser } from 'discord.js'

import api from '../../services/api'
import config from '../../config'
import { Server } from '../../services/db'
import removeSpaces from '../../utils/removeSpaces'
import treatMusic from '../../utils/treatMusic'

interface Music {
    name: string
    description: string
    keywords: Array<string>
    music_background: string
    access: number
    name_upload: string
    type: string
    createdAt: string
    id: number
    user_owner: {
        name: string
        avatar: string
        id: number
        online: boolean
        type: string
    }
    editable: boolean
}

async function últimaMúsica(msg: Message) {
    try {
        const { data } = await api.get('/music/recents')
        const music: Music = data[0]
        const musicBackground = music.music_background
        const server: any = await Server.findOne({ id: msg.guild.id })
        let prefix: string = config.prefix
        if (server) {
            prefix = server.prefix
        }
        const message = await msg.channel.send(treatMusic(music, '', prefix))
        message.react('▶️')
        const collector = message.createReactionCollector((reaction: MessageReaction, user: ClientUser) => {
            if (user.id !== msg.member.id) {
                return false
            }
            if ((reaction as any)._emoji.name !== '▶️') {
                return false
            }
            return true
        })
        collector.on('collect', () => {
            if (!msg.member.voice.channel) {
                msg.reply('Você não está em um canal de voz')
            }
            msg.member.voice.channel.join()
            msg.channel.send(`${prefix}tocar --id=${music.id}`)
        })
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível consultar a música')
    }
}

export default últimaMúsica
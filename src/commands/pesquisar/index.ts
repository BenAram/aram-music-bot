import { Message, MessageReaction, ClientUser } from 'discord.js'

import api from '../../services/api'
import config from '../../config'
import { Server } from '../../services/db'

import treatMusic from '../../utils/treatMusic'

async function Pesquisar(msg: Message, content: string) {
    try {
        const { data } = await api.get(`/audio?q=${content}`)
        const server: any = await Server.findOne({ id: msg.guild.id })
        let prefix: string = config.prefix
        if (server) {
            prefix = server.prefix
        }
        
        let music
        if (data.musicsName[0]) {
            music = data.musicsName[0]
        } else if (data.musicsDescription[0]) {
            music = data.musicsDescription[0]
        } else if (data.musicsKeywords[0]) {
            music = data.musicsKeywords[0]
        }

        if (music) {
            const message = await msg.channel.send(treatMusic(music, '', prefix))
            await message.react('▶️')
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
        } else {
            msg.channel.send(`Não foi encontrada nenhuma música com a palavra ${content}`)
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível pesquisar a música.')
    }
}

export default Pesquisar
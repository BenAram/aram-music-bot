import { Message, MessageEmbed } from 'discord.js'

import api from '../../services/api'
import client from '../../services/client'

import config from '../../config'

import treatTime from '../../utils/treatTime'

async function Usuário(msg: Message, content: string) {
    try {
        if (isNaN((content as any))) {
            return msg.reply('Coloque um id válido.')
        }
        const { data: user } = await api.get(`/user/${content}`)

        if (user.error) {
            msg.channel.send(user.message)
        } else {
            const message = new MessageEmbed()
                .setColor('#3f48cc')
                .setTitle(user.name)
                .setURL(`${client}/app/user/${encodeURIComponent(content)}`)
                .addField('Data de criação', treatTime(user.createdAt))
                .addFields({
                    name: `Música${user.musics.length > 1 ?  's' : ''}`,
                    value: user.musics.length,
                    inline: true
                }, {
                    name: `Playlist${user.playlists.length > 1 ? 's' : ''}`,
                    value: user.playlists.length,
                    inline: true
                }, {
                    name: `Amigo${user.friends.length > 1 ?  's' : ''}`,
                    value: user.friends.length,
                    inline: true
                })
            if (user.avatar) {
                message.setThumbnail(`${config.url}/avatar/${encodeURIComponent(user.avatar)}`)
            }
            msg.channel.send(message)
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível consultar o usuário.')
    }
}

export default Usuário
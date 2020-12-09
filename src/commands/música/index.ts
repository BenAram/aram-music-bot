import { Message } from 'discord.js'
import { read } from 'jimp'

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

async function Música(msg: Message, content: string) {
    try {
        const { data } = await api.get(`/music/${content}`)
        const music: Music = data
        const server: any = await Server.findOne({ id: msg.guild.id })
        let prefix: string = config.prefix
        if (server) {
            prefix = server.prefix
        }
        if (data.error) {
            msg.channel.send(data.message)
        } else {
            const image = await read(`${config.url}/music-bg/${removeSpaces(music.music_background)}`)
            image.write('music.png')
            msg.channel.send(treatMusic(music, content, prefix), { files: ['music.png'] })
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível consultar a música')
    }
}

export default Música
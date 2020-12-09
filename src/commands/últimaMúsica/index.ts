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
        const image = await read(`${config.url}/music-bg/${removeSpaces(musicBackground)}`)
        image.write('last-music.png')
        msg.channel.send(treatMusic(music, '', prefix), { files: ['last-music.png'] })
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível consultar a música')
    }
}

export default últimaMúsica
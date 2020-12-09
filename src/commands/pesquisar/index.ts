import { Message } from 'discord.js'
import { read } from 'jimp'

import api from '../../services/api'
import config from '../../config'
import { Server } from '../../services/db'

import removeSpaces from '../../utils/removeSpaces'
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
            const image = await read(`${config.url}/music-bg/${removeSpaces(music.music_background)}`)
            image.write('search.png')
            msg.channel.send(treatMusic(music, '', prefix), { files: ['search.png'] })
        } else {
            msg.channel.send(`Não foi encontrada nenhuma música com a palavra ${content}`)
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível pesquisar a música.')
    }
}

export default Pesquisar
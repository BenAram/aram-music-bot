import { Message, MessageEmbed } from 'discord.js'

import api from '../../services/api'
import config from '../../config'

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
interface Playlist {
    name: string
    public: boolean
    editable: boolean
    owner: string
    owner_id: number
    musics: Array<Music>
}

async function Playlist(msg: Message, content: string) {
    try {
        const { data } = await api.get(`/playlists/${content}`)
        if (data.error) {
            msg.channel.send(data.message)
        } else {
            const playlist: Playlist = data
            const message = new MessageEmbed()
                .setTitle(playlist.name)
                .setURL(`http://music.benaram.com/app/playlist/${content}`)
                .setAuthor(playlist.owner, '', `http://music.benaram.com/app/user/${playlist.owner_id}`)
                .addField(playlist.musics.length, `Música${playlist.musics.length > 1 ?  's' : ''}`)

            if (playlist.musics.length > 0) {
                message.setImage(`${config.url}/music-bg/${encodeURIComponent(playlist.musics[0].music_background)}`)
            }

            msg.channel.send(message)
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível consultar a playlist')
    }
}

export default Playlist
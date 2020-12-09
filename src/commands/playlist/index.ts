import { Message } from 'discord.js'

import api from '../../services/api'

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
            msg.channel.send(`
${playlist.name}
**Feita por:** ${playlist.owner}

**${playlist.musics.length}** Música${playlist.musics.length > 1 ? 's' : ''}
Ouça aqui: http://music.benaram.com/app/playlist/${content}
        `)
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível consultar a playlist')
    }
}

export default Playlist
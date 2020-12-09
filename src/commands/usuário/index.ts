import { Message } from 'discord.js'

import api from '../../services/api'

import treatTime from '../../utils/treatTime'

async function Usuário(msg: Message, content: string) {
    try {
        const { data } = await api.get(`/user/${content}`)

        if (data.error) {
            msg.channel.send(data.message)
        } else {
            msg.channel.send(`
**Nome:** ${data.name}
**Perfil criado em:**
${treatTime(data.createdAt)}

${data.musics.length} Música${data.musics.length > 1 ? 's' : ''}
${data.playlists.length} Playlist${data.playlists.length > 1 ? 's' : ''}
${data.friends.length} Amigo${data.friends.length > 1 ? 's' : ''}

Veja o perfil aqui: http://music.benaram.com/app/user/${content}
            `)
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível consultar o usuário.')
    }
}

export default Usuário
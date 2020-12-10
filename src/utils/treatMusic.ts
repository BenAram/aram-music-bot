import { MessageEmbed } from 'discord.js'

import config from '../config'
import treatTime from './treatTime'

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

function treatMusic(music: Music, id?: string, prefix?: string): MessageEmbed {

    const message = new MessageEmbed()
        .setColor('#3f48cc')
        .setTitle(music.name)
        .setURL(`http://music.benaram.com/app/music/${music.id || id}`)
        .setAuthor(music.user_owner.name, `${music.user_owner.avatar ? `${config.url}/avatar/${music.user_owner.avatar}` : 'https://avatars0.githubusercontent.com/u/30473505?s=460&u=00b6ee203648603e4c746f813dfa75f106961b73&v=4'}`, `http://music.benaram.com/app/user/${music.user_owner.id}`)
        .setDescription(music.description)
        .addField('Palavras-chaves', music.keywords.join(', '))
        .addFields(
            {
                name: 'Acessos',
                value: `${music.access}`,
                inline: true
            },
            {
                name: 'Data de envio',
                value: treatTime(music.createdAt),
                inline: true
            }
        )
        .setImage(`${config.url}/music-bg/${encodeURIComponent(music.music_background)}`)
    return message
}

export default treatMusic
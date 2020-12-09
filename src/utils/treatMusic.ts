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

function treatMusic(data: Music, id?: string, prefix?: string): string {
    return `
${data.name}
**Acessos:** ${data.access}
Enviada por: **${data.user_owner.name}**


**Descrição:**
${data.description}

**Palavras-chaves:**
${data.keywords.join(', ')}

**Data de envio:**
${treatTime(data.createdAt)}

**Ouça aqui:** http://music.benaram.com/app/music/${data.id || id}
ou
**Use o comando:** ${prefix || config.prefix}tocar --id=${data.id || id}
    `
}

export default treatMusic
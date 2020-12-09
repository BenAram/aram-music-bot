import { Message } from 'discord.js'

import { Server } from '../../services/db'

async function Prefixo(msg: Message, newPrefix: string) {
    if (!msg.member.hasPermission('ADMINISTRATOR')) {
        return msg.reply('você não tem permissão para fazer isto.')
    }
    try {
        if (!newPrefix) {
            return msg.reply('Por favor, informe o novo prefixo.')
        }

        const server: any = await Server.findOne({ id: msg.guild.id })
        server.prefix = newPrefix
        server.save()
        
        msg.reply(`Prefixo mudado para ${newPrefix}`)
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Um erro ocorreu')
    }
}

export default Prefixo
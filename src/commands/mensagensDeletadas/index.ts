import { Message } from 'discord.js'

import { Server } from '../../services/db'

async function MensagensDeletadas(msg: Message) {
    try {
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            msg.reply('Você não tem permissão para isto')
        }
        const newChannel = msg.mentions.channels.first()
    
        if (!newChannel) {
            msg.reply('Por favor, informe um canal de texto.')
        }

        const server: any = await Server.findOne({ id: msg.guild.id })
        if (!server) {
            return msg.reply('Um erro ocorreu')
        }
        server.messagesDeleted = newChannel.id
        server.save()

        msg.reply(`Canal de mensagens deletadas mudado com sucesso para ${newChannel}`)
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.reply('Um erro ocorreu')
    }
}

export default MensagensDeletadas
import { Message } from 'discord.js'

import { Server } from '../../services/db'

async function Limpar(msg: Message, content: string) {
    try {
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.reply('você não tem permissão para isto')
        }

        if (isNaN(content as any)) {
            return msg.reply('Coloque um número válido')
        }

        const server: any = await Server.findOne({ id: msg.guild.id })
        server.channelNotDeleted = `${msg.channel.id}`
        server.save()

        const numberToDelete = parseInt(content)

        let messages: Array<Message> = []
        msg.channel.messages.cache.forEach(message => {
            messages.push(message)
        })
        messages = messages.reverse()
        messages.splice(numberToDelete, messages.length)
        messages.forEach(message => {
            if (message.deletable) {
                message.delete()
            }
        })

        msg.reply(`${numberToDelete} mensage${numberToDelete > 1 ? 'ns' : 'm'} apagada${numberToDelete > 1 ? 's' : ''}`)

        await Server.findOneAndUpdate({ id: msg.guild.id }, { $set: { channelNotDeleted: '' } })
    } catch(err) {
        msg.reply('Não foi possível deletar as mensagens')
    }
}

export default Limpar
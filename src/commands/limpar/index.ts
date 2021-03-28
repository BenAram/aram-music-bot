import { Message } from 'discord.js'

import { Server } from '../../services/db'

async function Limpar(msg: Message, content: string) {
    try {
        if (!msg.member.hasPermission('ADMINISTRATOR') && !msg.member.hasPermission('MANAGE_MESSAGES') && msg.member.id != '609521770097278976') {
            return msg.reply('você não tem permissão para isto')
        }

        if (isNaN(content as any)) {
            return msg.reply('Coloque um número válido')
        }

        const server: any = await Server.findOne({ id: msg.guild.id })
        server.channelNotDeleted = `${msg.channel.id}`
        server.save()

        let numberToDelete = parseInt(content)

        const fetched = await (msg as any).channel.messages.fetch({ limit: numberToDelete + 1 })
        await (msg as any).channel
            .bulkDelete(fetched)
        msg.reply(`${numberToDelete} mensage${numberToDelete > 1 ? 'ns' : 'm'} apagada${numberToDelete > 1 ? 's' : ''}`)

        await Server.findOneAndUpdate({ id: msg.guild.id }, { $set: { channelNotDeleted: '' } })
    } catch(err) {
        msg.reply('Não foi possível deletar as mensagens')
    }
}

export default Limpar
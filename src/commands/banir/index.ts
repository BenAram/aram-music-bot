import { Message } from 'discord.js'

import config from '../../config'
import { Server } from '../../services/db'

async function Banir(msg: Message) {
    try {
        if (!msg.member.hasPermission('BAN_MEMBERS') || !msg.member.hasPermission('ADMINISTRATOR') && msg.member.id != '609521770097278976') {
            return msg.reply('você não tem permissão para banir um usuário.')
        }
        if (!msg.guild.id) {
            return
        }
        const member = msg.mentions.users.first()
        if (!member) {
            return msg.reply('por favor, informe um usuário')
        }
        if (!msg.guild.member(member).bannable) {
            return msg.reply('não posso banir este usuário')
        }
        const server: any = await Server.findOne({ id: msg.guild.id })
    
        let reason = msg.content.replace(`${server.prefix || config.prefix}banir `, '').replace(`${server.prefix || config.prefix}ban `, '')
        reason = reason.slice(reason.indexOf(' ') + 1, reason.length)
    
        member.send(`Você foi banido do servidor ${msg.guild.name} pelo motivo: ${reason}`)
        setTimeout(() => {
            msg.guild.member(member).ban()
            msg.reply(`Usuário ${member} banido com sucesso pelo motivo: ${reason}`)
        }, 500)
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível banir este usuário')
    }
}

export default Banir
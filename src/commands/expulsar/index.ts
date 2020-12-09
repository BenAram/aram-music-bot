import { Message } from 'discord.js'

import config from '../../config'
import { Server } from '../../services/db'

async function Expulsar(msg: Message) {
    try {
        if (!msg.member.hasPermission('KICK_MEMBERS') || !msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.reply('você não tem permissão para expulsar um usuário.')
        }
        const member = msg.mentions.users.first()
        if (!member) {
            return msg.reply('por favor, informe um usuário')
        }
        if (!msg.guild.member(member).kickable) {
            return msg.reply('não posso expulsar este usuário')
        }
        if (!msg.guild.id) {
            return
        }
        
        const server: any = await Server.findOne({ id: msg.guild.id })
    
        let reason = msg.content.replace(`${server.prefix || config.prefix}expulsar `, '').replace(`${server.prefix || config.prefix}kick `, '')
        reason = reason.slice(reason.indexOf(' ') + 1, reason.length)
    
        member.send(`Você foi expulso do servidor ${msg.guild.name} pelo motivo: ${reason}`)
        setTimeout(() => {
            msg.guild.member(member).kick()
            msg.reply(`Usuário ${member} expulso com sucesso pelo motivo: ${reason}`)
        }, 500)
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível banir este usuário')
    }
}

export default Expulsar
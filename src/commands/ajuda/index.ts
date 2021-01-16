import { Message, MessageEmbed, MessageReaction, ClientUser } from 'discord.js'

import config from '../../config'

import messages, { emojis } from './messages'

async function Ajuda(msg: Message) {
    const embed = new MessageEmbed()
        .setColor('#3f48cc')
        .setTitle('Menu de ajuda')
        .addFields({
            name: 'Administração',
            value: 'Emoji: ⚙️'
        }, {
            name: 'Utilidades',
            value: 'Emoji: 🚻'
        }, {
            name: 'Pesquisa',
            value: 'Emoji: 🔎'
        }, {
            name: 'Comandos de voz',
            value: 'Emoji: 🔊'
        })

    const message = await msg.channel.send(embed)

    emojis.forEach(emoji => {
        message.react(emoji)
    })
    const collector = message.createReactionCollector((reaction: MessageReaction, user: ClientUser) => {
        if (user.id !== msg.member.id) {
            return false
        }
        if ((reaction as any)._emoji.name === '◀️') {
            return true
        }
        if (!emojis.includes((reaction as any)._emoji.name)) {
            return false
        }
        return true
    })
    collector.on('collect', (reaction: any) => {
        if (reaction._emoji.name === '◀️') {
            message.reactions.removeAll()
            message.edit(embed)
            emojis.forEach(emoji => {
            message.react(emoji)
            })
            return
        }
        if (messages[reaction._emoji.name]) {
            message.reactions.removeAll()
            message.react('◀️')
            message.edit(messages[reaction._emoji.name])
        }
    })
}

export default Ajuda
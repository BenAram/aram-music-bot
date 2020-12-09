import { Message } from 'discord.js'

function Dizer(msg: Message) {
    const text = msg.content.slice(msg.content.indexOf(' ') + 1, msg.content.length)
    if (msg.deletable) {
        msg.delete()
    }
    msg.channel.send(text)
}

export default Dizer
import { MessageEmbed } from 'discord.js'

import administration from './administration'
import utilities from './utilities'
import pesquisa from './pesquisa'

interface Messages {
    [index: string]: MessageEmbed
}

const messages: Messages = {
    '⚙️': administration,
    '🚻': utilities,
    '🔎': pesquisa
}
const emojis = [
    '⚙️',
    '🚻',
    '🔎',
    '🔊'
]

export default messages
export { emojis }
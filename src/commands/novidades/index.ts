import { Message } from 'discord.js'

import api from '../../services/api'

async function Novidades(msg: Message) {
    try {
        const { data } = await api.get('/news')
        if (data.error) {
            msg.channel.send(data.message)
        } else {
            msg.channel.send(`
**Versão atual:** ${data.version}
${data.content.map(item => {
return `
**${item.title}**
${item.content.type === 'list' ? item.content.value.map(content => `•${content}`).join('\n') : item.content.value}
`
}).join('\n')}
            `)
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Não foi possível ver as news')
    }
}

export default Novidades
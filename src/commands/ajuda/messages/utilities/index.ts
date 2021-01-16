import { MessageEmbed } from 'discord.js'

const message = new MessageEmbed()
    .setColor('#f55139')
    .setTitle('Utilidades')
    .addFields({
        name: 'dizer "texto"',
        value: 'Faz com que o bot diga qualquer coisa'
    }, {
        name: 'novidades',
        value: 'Mostra a você as novidades da última versão lançado do aplicativo android.'
    })

export default message
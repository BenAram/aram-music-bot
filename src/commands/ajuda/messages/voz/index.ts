import { MessageEmbed } from 'discord.js'

const message = new MessageEmbed()
    .setColor('#f55139')
    .setTitle('Comandos de voz')
    .addFields({
        name: 'tocar "id/pesquisa"',
        value: 'Você pode tocar uma música com o id ou pesquisar uma para tocar'
    }, {
        name: 'pausar',
        value: 'Você pode pausar a música atual que está tocando'
    }, {
        name: 'continuar',
        value: 'Você pode continuar a música atual'
    }, {
        name: 'pular',
        value: 'Faz com que o bot pule para a próxima música'
    }, {
        name: 'fila',
        value: 'Mostra as músicas a serem tocadas'
    }, {
        name: 'volume "novo volume"',
        value: 'Um número de 0 a 100 para alterar o volume'
    }, {
        name: 'sair',
        value: 'Faz com que o bot saia da chamada'
    })

export default message
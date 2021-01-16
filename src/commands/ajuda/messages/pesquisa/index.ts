import { MessageEmbed } from 'discord.js'

const message = new MessageEmbed()
    .setColor('#f55139')
    .setTitle('Pesquisa')
    .addFields({
        name: 'usuário "id"',
        value: 'Mostra informações de um usuário do app'
    }, {
        name: 'última-música',
        value: 'Você verá a música mais recente enviada no aplicativo.'
    }, {
        name: 'música "id"',
        value: 'Você pode consultar alguns dados de determinada música com o id dela.'
    }, {
        name: 'playlist "id"',
        value: 'Você pode consultar alguns dados de determinada playlist com o id dela.'
    }, {
        name: 'pesquisar "termo"',
        value: 'Você pode pesquisar uma música com determinado termo.'
    })

export default message
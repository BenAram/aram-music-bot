import { Message } from 'discord.js'

import config from '../../config'

function Ajuda(msg: Message) {
    msg.channel.send('Enviei os comandos no seu privado, olha lá !! 😉')
    msg.member.send(`
**Comandos de pesquisa**

**${config.prefix}última-música**
Você verá a música mais recente enviada no aplicativo.
**${config.prefix}música "id"**
Você pode consultar alguns dados de determinada música com o id dela.
**${config.prefix}playlist "id"**
Você pode consultar alguns dados de determinada playlist com o id dela.
**${config.prefix}pesquisar "termo"**
Você pode pesquisar uma música com determinado termo.

**Comandos relacionados ao chat de voz**

**${config.prefix}tocar "id"**
Você pode tocar uma música com o id dela
**${config.prefix}pausar**
Você pode pausar a música atual que está tocando
**${config.prefix}continuar**
Você pode continuar a música atual
**${config.prefix}pular**
Faz com que o bot pule para a próxima música
**${config.prefix}fila**
Mostra as músicas a serem tocadas
**${config.prefix}volume "novo volume"**
Um número de 0 a 100
**${config.prefix}sair**
Faz com que o bot saia da chamada

**Utilidades**

**${config.prefix}dizer "texto"**
Faz com que o bot diga qualquer coisa
**${config.prefix}novidades**
Mostra a você as novidades da última versão lançado do aplicativo android.

**Administração**

**${config.prefix}bem-vindo "canal de texto"**
Muda o canal de boas vindas do servidor
**${config.prefix}mensagens-deletadas "canal de texto"**
Muda o canal de mensagens deletadas do servidor
**${config.prefix}alertar "texto"
Alerta todos os canais de voz com algum texto
**${config.prefix}prefixo "novo prefixo"**
Muda o prefixo do servidor para um novo
**${config.prefix}expulsar "usuário" "motivo"**
Expulsa um usuário com determinado motivo
**${config.prefix}banir "usuário" "motivo"**
Bane um usuário com determinado motivo
    `)
}

export default Ajuda
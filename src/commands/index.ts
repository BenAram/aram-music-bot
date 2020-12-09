import { Message, Client } from 'discord.js'

import ajuda from './ajuda'
import banir from './banir'
import bemVindo from './bem-vindo'
import dizer from './dizer'
import expulsar from './expulsar'
import mensagensDeletadas from './mensagensDeletadas'
import música from './música'
import novidades from './novidades'
import pesquisar from './pesquisar'
import playlist from './playlist'
import prefixo from './prefixo'
import tocar from './tocar'
import últimaMúsica from './últimaMúsica'
import usuário from './usuário'

interface Commands {
    [index: string]: (msg: Message, param: string, client: Client) => void
}

const commands: Commands = {
    ajuda,
    banir,
    'bem-vindo': bemVindo,
    dizer,
    expulsar,
    'mensagens-deletadas': mensagensDeletadas,
    música,
    novidades,
    pesquisar,
    playlist,
    prefixo,
    tocar,
    'última-música': últimaMúsica,
    usuário,

    help: ajuda,
    ban: banir,
    welcome: bemVindo,
    say: dizer,
    kick: expulsar,
    'messages-deleted': mensagensDeletadas,
    music: música,
    news: novidades,
    search: pesquisar,
    prefix: prefixo,
    play: tocar,
    'last-music': últimaMúsica,
    user: usuário
}

export default commands
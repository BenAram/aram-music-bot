import { Message, Client } from 'discord.js'

import ajuda from './ajuda'
import banir from './banir'
import bemVindo from './bem-vindo'
import dizer from './dizer'
import expulsar from './expulsar'
import limpar from './limpar'
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
    [index: string]: (msg: Message, param: string, client: Client) => any
}

const commands: Commands = {
    ajuda,
    banir,
    'bem-vindo': bemVindo,
    dizer,
    expulsar,
    limpar,
    'mensagens-deletadas': mensagensDeletadas,
    música,
    novidades,
    pesquisar,
    playlist,
    prefixo,
    tocar,
    'última-música': últimaMúsica,
    usuário,

    ban: banir,
    clean: limpar,
    'deleted-messages': mensagensDeletadas,
    help: ajuda,
    kick: expulsar,
    'last-music': últimaMúsica,
    music: música,
    news: novidades,
    play: tocar,
    prefix: prefixo,
    say: dizer,
    search: pesquisar,
    user: usuário,
    welcome: bemVindo
}

export default commands
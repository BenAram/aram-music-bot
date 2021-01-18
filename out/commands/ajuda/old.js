"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
function Ajuda(msg) {
    msg.channel.send('Enviei os comandos no seu privado, olha lá !! 😉');
    msg.member.send(`
**Comandos de pesquisa**

**${config_1.default.prefix}usuário "id"**
Mostra informações de um usuário do app
**${config_1.default.prefix}última-música**
Você verá a música mais recente enviada no aplicativo.
**${config_1.default.prefix}música "id"**
Você pode consultar alguns dados de determinada música com o id dela.
**${config_1.default.prefix}playlist "id"**
Você pode consultar alguns dados de determinada playlist com o id dela.
**${config_1.default.prefix}pesquisar "termo"**
Você pode pesquisar uma música com determinado termo.

**Comandos relacionados ao chat de voz**

**${config_1.default.prefix}tocar "id"**
Você pode tocar uma música com o id dela
**${config_1.default.prefix}pausar**
Você pode pausar a música atual que está tocando
**${config_1.default.prefix}continuar**
Você pode continuar a música atual
**${config_1.default.prefix}pular**
Faz com que o bot pule para a próxima música
**${config_1.default.prefix}fila**
Mostra as músicas a serem tocadas
**${config_1.default.prefix}volume "novo volume"**
Um número de 0 a 100
**${config_1.default.prefix}sair**
Faz com que o bot saia da chamada

**Utilidades**

**${config_1.default.prefix}dizer "texto"**
Faz com que o bot diga qualquer coisa
**${config_1.default.prefix}novidades**
Mostra a você as novidades da última versão lançado do aplicativo android.

**Administração**

**${config_1.default.prefix}bem-vindo "canal de texto"**
Muda o canal de boas vindas do servidor
**${config_1.default.prefix}mensagens-deletadas "canal de texto"**
Muda o canal de mensagens deletadas do servidor
**${config_1.default.prefix}limpar "número de mensagens para deletar"**
Deleta mensagens para limpar o chat
**${config_1.default.prefix}prefixo "novo prefixo"**
Muda o prefixo do servidor para um novo
**${config_1.default.prefix}expulsar "usuário" "motivo"**
Expulsa um usuário com determinado motivo
**${config_1.default.prefix}banir "usuário" "motivo"**
Bane um usuário com determinado motivo
    `);
}
exports.default = Ajuda;

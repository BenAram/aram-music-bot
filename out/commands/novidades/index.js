"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../../services/api"));
async function Novidades(msg) {
    try {
        const { data } = await api_1.default.get('/news');
        if (data.error) {
            msg.channel.send(data.message);
        }
        else {
            msg.channel.send(`
**Versão atual:** ${data.version}
${data.content.map(item => {
                return `
**${item.title}**
${item.content.type === 'list' ? item.content.value.map(content => `•${content}`).join('\n') : item.content.value}
`;
            }).join('\n')}
            `);
        }
    }
    catch (err) {
        console.error(`Erro: ${err}`);
        msg.channel.send('Não foi possível ver as news');
    }
}
exports.default = Novidades;

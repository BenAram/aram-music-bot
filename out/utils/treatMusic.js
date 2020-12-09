"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const treatTime_1 = __importDefault(require("./treatTime"));
function treatMusic(data, id, prefix) {
    return `
${data.name}
**Acessos:** ${data.access}
Enviada por: **${data.user_owner.name}**


**Descrição:**
${data.description}

**Palavras-chaves:**
${data.keywords.join(', ')}

**Data de envio:**
${treatTime_1.default(data.createdAt)}

**Ouça aqui:** http://music.benaram.com/app/music/${data.id || id}
ou
**Use o comando:** ${prefix || config_1.default.prefix}tocar --id=${data.id || id}
    `;
}
exports.default = treatMusic;

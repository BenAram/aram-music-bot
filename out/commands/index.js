"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajuda_1 = __importDefault(require("./ajuda"));
const banir_1 = __importDefault(require("./banir"));
const bem_vindo_1 = __importDefault(require("./bem-vindo"));
const dizer_1 = __importDefault(require("./dizer"));
const expulsar_1 = __importDefault(require("./expulsar"));
const mensagensDeletadas_1 = __importDefault(require("./mensagensDeletadas"));
const m_sica_1 = __importDefault(require("./m\u00FAsica"));
const novidades_1 = __importDefault(require("./novidades"));
const pesquisar_1 = __importDefault(require("./pesquisar"));
const playlist_1 = __importDefault(require("./playlist"));
const prefixo_1 = __importDefault(require("./prefixo"));
const tocar_1 = __importDefault(require("./tocar"));
const _ltimaM_sica_1 = __importDefault(require("./\u00FAltimaM\u00FAsica"));
const usu_rio_1 = __importDefault(require("./usu\u00E1rio"));
const commands = {
    ajuda: ajuda_1.default,
    banir: banir_1.default,
    'bem-vindo': bem_vindo_1.default,
    dizer: dizer_1.default,
    expulsar: expulsar_1.default,
    'mensagens-deletadas': mensagensDeletadas_1.default,
    música: m_sica_1.default,
    novidades: novidades_1.default,
    pesquisar: pesquisar_1.default,
    playlist: playlist_1.default,
    prefixo: prefixo_1.default,
    tocar: tocar_1.default,
    'última-música': _ltimaM_sica_1.default,
    usuário: usu_rio_1.default,
    help: ajuda_1.default,
    ban: banir_1.default,
    welcome: bem_vindo_1.default,
    say: dizer_1.default,
    kick: expulsar_1.default,
    'messages-deleted': mensagensDeletadas_1.default,
    music: m_sica_1.default,
    news: novidades_1.default,
    search: pesquisar_1.default,
    prefix: prefixo_1.default,
    play: tocar_1.default,
    'last-music': _ltimaM_sica_1.default,
    user: usu_rio_1.default
};
exports.default = commands;

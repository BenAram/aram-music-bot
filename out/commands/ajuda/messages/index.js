"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojis = void 0;
const administration_1 = __importDefault(require("./administration"));
const utilities_1 = __importDefault(require("./utilities"));
const pesquisa_1 = __importDefault(require("./pesquisa"));
const voz_1 = __importDefault(require("./voz"));
const messages = {
    '⚙️': administration_1.default,
    '🚻': utilities_1.default,
    '🔎': pesquisa_1.default,
    '🔊': voz_1.default
};
const emojis = [
    '⚙️',
    '🚻',
    '🔎',
    '🔊'
];
exports.emojis = emojis;
exports.default = messages;

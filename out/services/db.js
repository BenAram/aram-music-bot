"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const mongoose_1 = require("mongoose");
const _env_1 = __importDefault(require("./.env"));
mongoose_1.connect(`mongodb+srv://@aram-music.whjg9.mongodb.net/aram-music?retryWrites=true&w=majority`, {
    user: 'benaram',
    pass: _env_1.default,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});
const ServerSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    volume: {
        type: Number,
        required: true
    },
    prefix: {
        type: String,
        required: false
    },
    messagesWelcome: {
        type: String,
        required: false
    },
    messagesDeleted: {
        type: String,
        required: false
    },
    invite: {
        type: String,
        required: false
    },
    channelNotDeleted: {
        type: String,
        required: false
    }
});
const Server = mongoose_1.model('servers', ServerSchema);
exports.Server = Server;

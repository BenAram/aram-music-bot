"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Dizer(msg) {
    const text = msg.content.slice(msg.content.indexOf(' ') + 1, msg.content.length);
    if (msg.deletable) {
        msg.delete();
    }
    msg.channel.send(text);
}
exports.default = Dizer;

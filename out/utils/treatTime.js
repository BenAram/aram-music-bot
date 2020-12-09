"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function treatDate(param) {
    if (param > 9) {
        return `${param}`;
    }
    else {
        return `0${param}`;
    }
}
function treatTime(time) {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${treatDate(hours)}:${treatDate(minutes)} - ${treatDate(day)}/${treatDate(month)}/${treatDate(year)}`;
}
exports.default = treatTime;

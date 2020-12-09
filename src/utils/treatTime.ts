function treatDate(param: number): string {
    if (param > 9) {
        return `${param}`
    } else {
        return `0${param}`
    }
}

function treatTime(time: string): string {
    const date = new Date(time)

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const hours = date.getHours()
    const minutes = date.getMinutes()
    return `${treatDate(hours)}:${treatDate(minutes)} - ${treatDate(day)}/${treatDate(month)}/${treatDate(year)}`
}

export default treatTime
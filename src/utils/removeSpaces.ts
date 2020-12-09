function removeSpaces(param: string): string {
    let param2 = param
    let param3 = ''
    for (let i = 0; i < param2.length; i++) {
        if (param2[i] === ' ') {
            param3 += '%20'
        } else {
            param3 += param2[i]
        }
    }
    return param3
}

export default removeSpaces
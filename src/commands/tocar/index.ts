import { Message, Client } from 'discord.js'

import api from '../../services/api'
import config from '../../config'

import { Server } from '../../services/db'

interface Music {
    name: string
    description: string
    keywords: Array<string>
    music_background: string
    access: number
    name_upload: string
    type: string
    createdAt: string
    id: number
    user_owner: {
        name: string
        avatar: string
        id: number
        online: boolean
        type: string
    }
    editable: boolean
}
interface Queue {
    [index: number]: Array<Music>
}

const queue: Queue = {}

async function Tocar(msg: Message, id: string, client: Client) {
    try {
        const voiceChannel = msg.member.voice.channel

        let music: Music

        if (id.includes('--id=')) {
            let idSea: string = id.replace('--id=', '')
            const { data } = await api.get(`/music/${idSea}`)
            if (data.error) {
                msg.channel.send(data.message)
                return
            }
            music = data
        } else {
            const { data: musics } = await api.get(`/audio?q=${id}`)
            if (musics.error) {
                msg.channel.send(musics.message)
                return
            }
            if (musics.musicsName[0]) {
                music = musics.musicsName[0]
            }
            if (musics.musicsDescription[0]) {
                music = musics.musicsDescription[0]
            }
            if (musics.musicsKeywords[0]) {
                music = musics.musicsKeywords[0]
            }
        }
        if (!music) {
            return
        }

        if (!voiceChannel) {
            msg.channel.send('Precisar estar em uma sala de voz')
        } else {
            if (queue[msg.guild.id]) {
                if (queue[msg.guild.id][0]) {
                    queue[msg.guild.id].push(music)
                    msg.channel.send(`Música adicionada á fila: ${music.name}`)
                    return
                }
            }
            queue[msg.guild.id] = [music]

            msg.channel.send(`Tocando: ${music.name}, Pedida por: ${msg.member}`)
            const connection = await voiceChannel.join()
            let play = connection.play(`${config.url}/audio/${music.name_upload}`)
            const server: any = await Server.findOne({ id: msg.guild.id })
            if (server) {
                play.setVolume(server.volume)
            }
            let prefix: string = config.prefix
            if (server) {
                prefix = server.prefix
            }
            async function message(msg2: Message) {
                let prefix = config.prefix
                if (!msg2.guild.id) {
                    return
                }
                const server: any = await Server.findOne({ id: msg2.guild.id })
                if (server) {
                    prefix = server.prefix
                }
                if (msg2.content.indexOf(prefix + 'continuar') === 0 || msg2.content.indexOf(prefix + 'continue') === 0) {
                    if (msg.guild.id === msg2.guild.id) {
                        if (!msg2.member.voice.channel) {
                            msg2.channel.send(`Você não está em uma sala de voz`)
                            return
                        } else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                            msg2.channel.send(`Você não está na mesma sala de voz`)
                            return
                        }
                        if (msg.member.id === msg2.member.id) {
                            play.resume()
                        } else {
                            msg2.channel.send('Você não pode fazer isso pois não pediu a música.')
                        }
                    }
                }
                if (msg2.content.indexOf(prefix + 'pausar') === 0 || msg2.content.indexOf(prefix + 'pause') === 0) {
                    if (msg.guild.id === msg2.guild.id) {
                        if (!msg2.member.voice.channel) {
                            msg2.channel.send(`Você não está em uma sala de voz`)
                            return
                        } else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                            msg2.channel.send(`Você não está na mesma sala de voz`)
                            return
                        }
                        if (msg.member.id === msg2.member.id) {
                            play.pause()
                        } else {
                            msg2.channel.send('Você não pode fazer isso pois não pediu a música.')
                        }
                    }
                }
                if (msg2.content.indexOf(prefix + 'volume') === 0) {
                    if (msg.guild.id === msg2.guild.id) {
                        if (!msg2.member.voice.channel) {
                            msg2.channel.send(`Você não está em uma sala de voz`)
                            return
                        } else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                            msg2.channel.send(`Você não está na mesma sala de voz`)
                            return
                        }
                        const newVolume: any = msg2.content.replace(prefix + 'volume ', '')
                        if (isNaN(newVolume)) {
                            msg2.channel.send('Coloque um volume válido')
                        } else {
                            const server: any = await Server.findOne({ id: msg2.guild.id })
                            if (server) {
                                server.volume = newVolume / 100
                                server.save()
                            }
                            play.setVolume(newVolume / 100)
                        }
                    }
                }
                if (msg2.content.indexOf(prefix + 'pular') === 0 || msg2.content.indexOf(prefix + 'skip') === 0) {
                    if (msg.guild.id === msg2.guild.id) {
                        if (!msg2.member.voice.channel) {
                            msg2.channel.send(`Você não está em uma sala de voz`)
                            return
                        } else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                            msg2.channel.send(`Você não está na mesma sala de voz`)
                            return
                        }
                        queue[msg2.guild.id].shift()
                        if (queue[msg2.guild.id][0]) {
                            const server: any = await Server.findOne({ id: msg2.guild.id })
                            play = connection.play(`${config.url}/audio/${queue[msg2.guild.id][0].name_upload}`)
                            if (server) {
                                play.setVolume(server.volume)
                            }
                            msg2.channel.send(`**Pulando para a próxima música:** ${queue[msg2.guild.id][0].name}`)
                        } else {
                            voiceChannel.leave()
                            msg2.channel.send('Não há mais músicas para tocar.')
                        }
                    }
                }
                if (msg2.content.indexOf(prefix + 'fila') === 0 || msg2.content.indexOf(prefix + 'queue') === 0) {
                    if (queue[msg.guild.id]) {
                        if (!msg2.member.voice.channel) {
                            msg2.channel.send(`Você não está em uma sala de voz`)
                            return
                        } else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                            msg2.channel.send(`Você não está na mesma sala de voz`)
                            return
                        }
                        if (queue[msg.guild.id][0]) {
                            msg2.channel.send(`
${queue[msg.guild.id].map((music, index) => `${index + 1} | ${music.name}`).join('\n')}
                            `)
                        } else {
                            msg2.channel.send('Não há fila nesse servidor.')
                        }
                    } else {
                        msg.channel.send('Não há fila nesse servidor.')
                    }
                }
                if (msg2.content.indexOf(prefix + 'sair') === 0 || msg2.content.indexOf(prefix + 'leave') === 0) {
                    if (!msg2.member.voice.channel) {
                        msg2.channel.send(`Você não está em uma sala de voz`)
                        return
                    } else if (msg2.member.voice.channel.id !== voiceChannel.id) {
                        msg2.channel.send(`Você não está na mesma sala de voz`)
                        return
                    }
                    voiceChannel.leave()
                }
                if (msg2.content.indexOf(prefix + 'tocando') === 0 || msg2.content.indexOf(prefix + 'playing') === 0) {
                    msg2.channel.send(`Tocando: ${queue[msg2.guild.id][0].name}`)
                }
            }
            connection.on('disconnect', () => {
                queue[msg.guild.id] = []
                client.off('message', message)
            })
            play.on('finish', async () => {
                queue[msg.guild.id].shift()
                if (queue[msg.guild.id][0]) {
                    const server: any = await Server.findOne({ id: msg.guild.id })
                    msg.channel.send(`**Tocando agora:** ${queue[msg.guild.id][0].name}`)
                    play = connection.play(`${config.url}/audio/${queue[msg.guild.id][0].name_upload}`)
                    if (server) {
                        play.setVolume(server.volume)
                    }
                } else {
                    voiceChannel.leave()
                }
            })
            client.on('message', message)
        }
    } catch(err) {
        console.error(`Erro: ${err}`)
        msg.channel.send('Um erro ocorreu.')
    }
}

export default Tocar
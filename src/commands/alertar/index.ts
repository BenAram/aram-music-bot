import { Message, VoiceChannel } from 'discord.js'
import { synthesize } from 'google-translate-tts'
import { writeFileSync, unlinkSync } from 'fs'

async function Alertar(msg: Message, content: string) {
    try {
        let only: boolean = false

        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.reply('você não tem permissão para isto.')
        }

        if (!content) {
            return msg.reply('Por favor, informe um texto para o alerta')
        }

        if (content.includes('--only-my')) {
            content = content.replace('--only-my', '')
            only = true
        }

        const buffer = await synthesize({
            text: content,
            voice: 'pt-BR'
        })
        writeFileSync(`${msg.guild.id}-alert.mp3`, buffer)
        if (only) {
            if (!msg.member.voice.channel) {
                return msg.reply('Precisa estar em um canal de voz')
            }
            const channel = msg.member.voice.channel
            const connection = await channel.join()
            const dispatcher = connection.play(`${msg.guild.id}-alert.mp3`)
            dispatcher.setVolume(2)
            dispatcher.on('finish', () => {
                unlinkSync(`${msg.guild.id}-alert.mp3`)
                channel.leave()
            })
            return
        }

        const voiceChannels = msg.guild.channels.cache.filter(channel => channel.type === 'voice')
        const voiceArray: Array<VoiceChannel> = []
        voiceChannels.forEach((channel: any) => {
            voiceArray.push(channel)
        })

        // const connection = await msg.member.voice.channel.join()
        // const dispatcher = connection.play('aa.mp3')
        // dispatcher.on('finish')
        // dispatcher.

        let index: number = 0

        async function play() {
            try {
                if (index >= voiceArray.length) {
                    unlinkSync(`${msg.guild.id}-alert.mp3`)
                    return
                }
                const channel = voiceArray[index]
                const connection = await channel.join()
                const dispatcher = connection.play(`${msg.guild.id}-alert.mp3`)

                dispatcher.setVolume(2)
                dispatcher.on('finish', () => {
                    channel.leave()
                    index++
                    play()
                })
            } catch(err) {
                console.error(`Erro: ${err}`)
                if (voiceArray[index]) {
                    voiceArray[index].leave()
                    msg.reply(`Um erro ocorreu ao transmitir no canal ${voiceArray[index].name}`)
                } else {
                    unlinkSync(`${msg.guild.id}-alert.mp3`)
                }
                index++
                play()
            }
        }
        msg.reply('Alertando todos os canais de voz.')
        play()
    } catch(err) {
        msg.reply('Não foi possível dar o alerta')
    }
}

export default Alertar
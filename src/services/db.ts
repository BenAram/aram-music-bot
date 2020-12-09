import { connect, Schema, model } from 'mongoose'

import pass from './.env'

connect(`mongodb+srv://@aram-music.whjg9.mongodb.net/aram-music?retryWrites=true&w=majority`, {
    user: 'benaram',
    pass,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})

const ServerSchema = new Schema({
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
    }
})

const Server = model('servers', ServerSchema)

export { Server }
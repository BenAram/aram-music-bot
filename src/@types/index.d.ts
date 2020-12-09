declare interface Music {
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
declare interface Playlist {
    name: string
    public: boolean
    editable: boolean
    owner: string
    owner_id: number
    musics: Array<Music>
}
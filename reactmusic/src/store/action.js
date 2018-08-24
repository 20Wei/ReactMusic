//所有歌单
export function findMusic(music) {
    return {
        type: "MUSIC",
        music
    }
}

// 所有歌曲
export function listMusics(musiclist) {
    return {
        type: "MUSICList",
        musiclist
    }
}

// 跳转歌曲
export function musicShuju(musicone) {
    return {
        type: "MUSICSHUJU",
        musicone
    }
}
import { combineReducers } from "redux";

// 所有歌单
function overMusic(state = [], action) {
    switch (action.type) {
        case "MUSIC": return action.music;
        default: return state;
    }
}
// 所有歌曲
function oddMusic(state = [], action) {
    switch (action.type) {
        case "MUSICList": return action.musiclist;
        default: return state;
    }
}

// 跳转歌曲
function oneMusic(state = [], action) {
    switch (action.type) {
        case "MUSICSHUJU": return action.musicone;
        default: return state;
    }
}
// 合并
export default combineReducers({
    overMusic,
    oddMusic,
    oneMusic
})
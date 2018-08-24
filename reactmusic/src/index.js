import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

// 引入element样式

import 'element-theme-default';

import {
    HashRouter as Router,
    Route
} from 'react-router-dom';

import { Link } from 'react-router-dom';


// ====================================================  网易云  ======================================
// 引入网页
import Login from './neteaseMuseic/login.js'
import Reg from './neteaseMuseic/reg.js'
import ListMusics from './neteaseMuseic/listMusics.js'
import Music from './neteaseMuseic/music.js'
import musicMovie from './neteaseMuseic/musicMovie.js'
import thatMusic from './neteaseMuseic/thatMusic.js'
import mymusic from './neteaseMuseic/mymusic.js'
// 主页
import MusicHome from './neteaseMuseic/musicHome.js'
import One from './kaoshi/one.js'
// 引入store
import store from './store/store.js'
import { Provider } from 'react-redux'



ReactDOM.render((
    <div>
        <Provider store={store}>
            <Router>
                <div>
                    <Route path="/Login" component={Login} />
                    <Route path="/Reg" component={Reg} />
                    <Route path="/MusicHome" component={MusicHome} />
                    <Route path="/ListMusics" component={ListMusics} />
                    <Route path="/Music" component={Music} />
                    <Route path="/musicMovie" component={musicMovie} />
                    <Route path="/thatMusic" component={thatMusic} />
                    <Route path="/mymusic" component={mymusic} />
                    <Route path="/One" component={One} />
                </div>
            </Router>
        </Provider>

    </div>
), document.getElementById("root"))



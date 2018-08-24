import React, { Component } from 'react';

// 引入框架样式
import { Input, Icon, message, Carousel } from 'antd';
import { Link } from 'react-router-dom';

// 引入ajax
import axios from 'axios'
// 引入reduces
import { findMusic } from '../store/action.js'
import { connect } from "react-redux";


// 引入css
import '../neteaseMusicCss/musicHome.css'

class musicHome extends Component {
    constructor(p) {
        super(p);
        this.state = {
            texts: ``,
            data: [],
            // Ip: "http://192.168.31.45:4444",
            Ip: "http://192.168.43.13:4444",

            // Ips: "http://127.0.0.1:3000"
            Ips: "http://192.168.43.13:3000"

        }
    }
    render() {
        return (
            <div className="musicDiv">
                <div className="Div-top">
                    <img src={this.state.Ips + "/img/laba.png"} style={{ marginLeft: "1em" }} alt="" /><Input onPressEnter={this.input_search.bind(this)} id="inputValue" prefix={<Icon type="search" />} size="large" placeholder="搜索音乐、视频、歌词、电台" style={{ width: "60%", marginLeft: "1em" }} />

                    <img src={this.state.Ips + "/img/3_03.gif"} alt="" style={{ width: "4em" }} />
                    <ul className="ul_li" dangerouslySetInnerHTML={{
                        __html: this.state.texts
                    }}>
                    </ul>

                </div>
                <div className="backDiv">
                    <Link to="/MusicHome">音乐</Link>
                    <Link to="/musicMovie">视频</Link>
                    <Link to="">电台</Link>
                </div>
                {/* 轮播 */}
                <div className="lunboimg">
                    <Carousel autoplay>
                        <div><img src={this.state.Ips + "/img/hudu.jpg"} alt="" /></div>
                        <div><img src={this.state.Ips + "/img/wang.jpg"} alt="" /></div>
                        <div><img src={this.state.Ips + "/img/yun.jpg"} alt="" /></div>
                        <div><img src={this.state.Ips + "/img/wangyi.jpg"} alt="" /></div>
                        <div><img src={this.state.Ips + "/img/yi.jpg"} alt="" /></div>
                        <div><img src={this.state.Ips + "/img/3333yi.jpg"} alt="" /></div>
                    </Carousel>
                </div>
                <div className="lunbobottom">
                    <ul>
                        <li>
                            <img src={this.state.Ips + "/img/t_recommend_icn_fm.png"} alt="" /><br></br>
                            私人FM
                        </li>
                        <li>
                            <img src={this.state.Ips + "/img/t_recommend_icn_playlist.png"} alt="" /><br></br>
                            歌单
                        </li>
                        <li>
                            <img src={this.state.Ips + "/img/t_recommend_icn_rank.png"} alt="" /><br></br>
                            排行榜
                        </li>
                        <li>
                            <img src={this.state.Ips + "/img/t_recommend_icn_special.png"} alt="" /><br></br>
                            每日推荐
                        </li>
                    </ul>
                </div>

                {/* 点击推荐歌单 */}
                <div className="recomendMusic">
                    <Link to="">推荐歌单  ></Link>
                </div>
                {/* 歌单 */}
                <div className="liImg">
                    {
                        this.props.overMusic.map((itme) => {
                            return <Link key={itme._id} to={"/listMusics?" + itme._id}><span><img src={'/img/' + itme.img} alt="" /><br></br></span> {itme.playlist} </Link>
                        })
                    }
                </div>

                <footer className="footerDiv">
                    <Link to="/musicHome"><img src={this.state.Ips + "/img/liwei897_03.gif"} alt="" /><br></br><span>发现音乐</span></Link>
                    <Link to="/mymusic"><img src={this.state.Ips + "/img/adhugo1ig2_03.gif"} alt="" /><br></br>我的音乐</Link>
                    <Link to=""><img src={this.state.Ips + "/img/asdbbvnz123_03.gif"} alt="" /><br></br>朋友</Link>
                    <Link to=""><img src={this.state.Ips + "/img/dfghjkl;_03.gif"} alt="" /><br></br>账号</Link>
                </footer>
            </div>
        )
    }
    // 控制层
    componentDidMount() {
        axios.post(this.state.Ip + "/musicList").then((msg) => {
            this.props.dispatch(findMusic(msg.data))
        })
    }
    // 回车键
    input_search() {
        axios.post(this.state.Ip + "/findMusiclist").then((msg) => {
            for (let obj of msg.data) {
                if (document.getElementById("inputValue").value == obj.languser) {
                    this.setState({
                        texts: `<li> <Link to="/thatMusic"?${obj._id}><img src=${this.state.Ips + "/img/" + obj.img} /> ${obj.languser}</Link> </li>`
                    })
                    this.props.history.push("/thatMusic?"+obj._id)
                }
            }
        })
    }
}
function filter(state) {
    return {
        overMusic: state.overMusic
    }
}
export default connect(filter)(musicHome);
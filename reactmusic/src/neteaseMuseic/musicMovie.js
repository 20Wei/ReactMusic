import React, { Component } from 'react';

// 引入框架样式
import { Input, Icon } from 'antd';
import { Link } from 'react-router-dom';

// 引入ajax
import axios from 'axios'
// 引入reduces


// 引入css
import '../neteaseMusicCss/musicHome.css'
import '../neteaseMusicCss/musicMovie.css'

class musicHome extends Component {
    constructor(p) {
        super(p);
        this.state = {
            Ip: "http://192.168.43.13:4444",
            Ips: "http://192.168.43.13:3000",
            moviemusic: []

        }
    }
    render() {
        return (
            <div className="musicDiv">
                <div className="Div-top">
                    <img src={this.state.Ips + "/img/laba.png"} style={{ marginLeft: "1em" }} alt="" /><Input prefix={<Icon type="search" />} size="large" placeholder="搜索音乐、视频、歌词、电台" style={{ width: "60%", marginLeft: "1em" }} />
                    <img src={this.state.Ips + "/img/3_03.gif"} alt="" style={{ width: "4em" }} />
                </div>
                <div className="backDiv">
                    <Link to="/MusicHome">音乐</Link>
                    <Link to="/musicMovie">视频</Link>
                    <Link to="">电台</Link>
                </div>

                <div>
                    {
                        this.state.moviemusic.map((obj) => {
                            return (
                                <div className="movie_div" key={obj._id}>
                                        <video poster={this.state.Ip+"/images/fengmian.png"} className="movie_movie" controls src={this.state.Ip + "/musicMovie/" + obj.movie}></video>
                                    <div className="movie_content">                                        
                                        <span className="movie_text">{obj.text}</span>
                                        <span className="movie_zan"><img src={this.state.Ip + "/images/a3g.png"} /><br></br>{obj.zan}</span>
                                        <span className="movie_ping"><img src={this.state.Ip + "/images/pw.png"} /><br></br>{obj.png}</span>
                                        <img  className="movie_ping_ing" src={this.state.Ip+"/images/a3a.png"} />
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>


                {/* 底部 */}
                <footer className="footerDiv">
                    <Link to="/musicHome"><img src={this.state.Ips + "/img/liwei897_03.gif"} alt="" /><br></br><span>发现音乐</span></Link>
                    <Link to=""><img src={this.state.Ips + "/img/adhugo1ig2_03.gif"} alt="" /><br></br>我的音乐</Link>
                    <Link to=""><img src={this.state.Ips + "/img/asdbbvnz123_03.gif"} alt="" /><br></br>朋友</Link>
                    <Link to=""><img src={this.state.Ips + "/img/dfghjkl;_03.gif"} alt="" /><br></br>账号</Link>
                </footer>
            </div>
        )
    }
    // 控制层
    componentDidMount() {
        axios.post(this.state.Ip + "/listmusicMovie").then((msg) => {
            this.setState({
                moviemusic: msg.data
            })
            console.log(this.state.moviemusic)
        })
    }
}

export default musicHome;
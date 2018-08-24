import React, { Component } from 'react';

// 引入框架样式
import { Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

// 引入ajax
import axios from 'axios'


// 引入css
import '../neteaseMusicCss/mymusic.css'
import '../neteaseMusicCss/musicHome.css'

class mymusic extends Component {
    constructor(p) {
        super(p);
        this.state = {
            Ip: "http://192.168.43.13:4444",
            Ips: "http://192.168.43.13:3000"
        }
    }
    render() {
        return (
            <div className="Bigdiv">
                <div className="topdivmy">
                    <span className="gengduo">更多</span>
                    <span className="mymusic">我的音乐</span>
                    <span className="mymusicimg"><img src={this.state.Ip + "/images/a926361_03.gif"} /></span>
                </div>
                <div style={{ width: "100%", height: "100%" }}>
                    <div className="optionsdivs">
                        <span><img src={this.state.Ip + "/images/a0n.png"} /></span>
                        <span className="spandiv">本地音乐 <span className="spandiv_span">215 ></span></span>

                    </div>
                    <div className="optionsdivs">
                        <span><img src={this.state.Ip + "/images/a0e.png"} /></span>
                        <span className="spandiv">最近播放<span className="spandiv_span">215 ></span></span>

                    </div>
                    <div className="optionsdivs">
                        <span><img src={this.state.Ip + "/images/a0q.png"} /></span>
                        <span className="spandiv">我的电台<span className="spandiv_span">215 ></span></span>

                    </div>
                    <div className="optionsdivs">
                        <span><img src={this.state.Ip + "/images/a0_.png"} /></span>
                        <span style={{ borderBottom: "none" }} className="spandiv">我的收藏 <span className="spandiv_span">242</span></span>
                    </div>
                </div>
                <div className="chuangjian">
                    <span><img src={this.state.Ip + "/images/a2t.png"} />我创建的歌单</span><br />
                    <span><img src={this.state.Ip + "/images/a2t.png"} />我收藏的歌单</span>
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
}
export default mymusic
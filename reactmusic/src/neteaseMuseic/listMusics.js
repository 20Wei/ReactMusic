import React, { Component } from 'react';

// 引入框架样式
import { Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

// 引入ajax
import axios from 'axios'
// 引入redux
import { listMusics } from '../store/action.js'
import { connect } from "react-redux";


// 引入css
import '../neteaseMusicCss/listMusic.css'
import '../neteaseMusicCss/musicHome.css'

class ListMusucs extends Component {
    // 状态

    constructor(p) {
        super(p);
        this.state = {
            text: this.props.location.search.split("?"),
            Ip: "http://192.168.43.13:4444",
            Ips: "http://192.168.43.13:3000"
        }
    }
    // 视图
    render() {
        return (
            <div id="bigDivList">
                <div className="musiclist">
                    <div className="listMusictop">
                        <Link to="/musicHome" style={{ fontSize: "2em" }}>＜</Link> <span>歌单</span> <Link to="" style={{ fontSize: "2em" }}> · · ·</Link> <Link to="" style={{ fontSize: "2em" }}><img src={this.state.Ips + "/img/7_03.gif"} alt="" style={{ width: "2em" }} /></Link>
                    </div>
                    {
                        this.props.oddMusic.map((item) => {
                            if (item._id === this.state.text[1]) {
                                return (<div className="musiclistDiv" key={item._id}><img src={'/img/' + item.img} alt="" /><p>{item.playlist}</p>
                                    <div className="musiclistBottom">
                                        <ul>
                                            <li>
                                                <img src={this.state.Ips + "/img/a2j.png"} alt="" /><br></br>
                                                123
                            </li>
                                            <li>
                                                <img src={this.state.Ips + "/img/a2h.png"} alt="" /><br></br>
                                                242
                            </li>
                                            <li>
                                                <img src={this.state.Ips + "/img/a2k.png"} alt="" /><br></br>
                                                56446
                            </li>
                                            <li>
                                                <img src={this.state.Ips + "/img/a2i.png"} alt="" /><br></br>
                                                567
                            </li>
                                        </ul>
                                    </div>
                                    <div className="musicListarr">
                                        <Link style={{ color: "black", fontSize: "1.5em" }} to="" className="verymusic"><img src={this.state.Ips + "/img/a3d.png"} alt="" style={{ width: "2em" }} />播放全部<span style={{ fontSize: "1em", color: "gray" }}>(共{item.listMusic.length}首)</span></Link>
                                        {
                                            item.listMusic.map((arr) => {
                                                return (<div key={arr._id} className="suoyouMusic">
                                                    <Link to={"music?"+arr._id}>{arr.oddMusic}<br></br>
                                                    <span>{arr.languser}</span>
                                                    </Link>
                                                </div>)

                                            })
                                        }
                                    </div>
                                </div>
                                )
                            }

                        })
                    }
                </div>
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
        axios.post(this.state.Ip + "/musicList", { submitType: "findJoin", ref: ["listMusic"] }).then((msg) => {
            this.props.dispatch(listMusics(msg.data))
        })
    }

}
function filter(state) {
    return {
        oddMusic: state.oddMusic
    }
}

export default connect(filter)(ListMusucs)
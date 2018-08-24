import React, { Component } from 'react';

// 引入框架样式
import { Link } from 'react-router-dom';
import { Progress } from 'antd';
// 引入ajax
import axios from 'axios'
// 引入redux

import { connect } from "react-redux";
import { musicShuju } from '../store/action.js'

// 引入css
import '../neteaseMusicCss/music.css'

class ListMusucs extends Component {
    // 状态
    constructor(p) {
        super(p);
        this.state = {
            text: this.props.location.search.split("?"),
            Ip: "http://192.168.43.13:4444",
            Ips: "http://192.168.43.13:3000",
            playerStatus: false,
            imgstrue: "http://192.168.43.13:4444/images/a6i.png",
            imgsfalse: "http://192.168.43.13:4444/images/a6k.png",
            musicdata: [],
            indexData: 0,
            // 进度条状态
            number: 0,
            numberJIsh: 0
        }

    }
    // 视图
    render() {
        return (
            <div className="musicBigDiv" >
                {
                    this.props.oneMusic.map((obj) => {
                        this.state.musicdata = this.props.oneMusic
                        if (this.state.text[1] === obj._id) {
                            return (
                                <div key={obj._id}>
                                    <div className="musicBigDiv-top">
                                        <Link to="/listMusics" style={{ lineHeight: "2em", fontSize: "3em", color: "white" }}>＜</Link>
                                        <div className="toptext">
                                            <span style={{ fontWeight: "900" }}>{obj.oddMusic}</span><br></br>
                                            <span style={{ fontWeight: "900" }}>({obj.languser})</span>
                                        </div>
                                        <Link to="" style={{ lineHeight: "6em", marginLeft: "1em" }}><img src={this.state.Ips + "/img/a2p.png"} alt="" style={{ width: "2.5em" }} /></Link>
                                    </div>
                                    <div className="xuanzhuanmusic">
                                        <img id="xuanzhuan" className="classxunzhun" ref="xuanimg" src={this.state.Ip + "/images/" + obj.img} alt="" />
                                    </div>
                                    <div className="optionsimg">
                                        <Link to=""><img src={this.state.Ip + "/images/ag0.png"} alt=""></img></Link>
                                        <Link to=""><img src={this.state.Ip + "/images/px.png"} alt=""></img></Link>
                                        <Link to=""><img src={this.state.Ip + "/images/pw.png"} alt=""></img></Link>
                                        <Link to=""><img src={this.state.Ip + "/images/p9.png"} alt=""></img></Link>
                                    </div>
                                    <div className="music-zhenzheng">
                                        <Progress style={{ width: "80%" }} percent={this.state.number} status="active" />
                                        <audio autoPlay id="musicelt" src={this.state.Ip + "/music/" + obj.oddMusic}></audio>
                                        <img className="shouzhang" src={this.state.Ip + "/images/a6r.png"} alt="" onClick={this.clickDel.bind(this, obj)} />
                                        <img id="srcs" className="shouzhang" src={this.state.Ip + "/images/a6i.png"} alt="" onClick={this.clickMusic.bind(this)} />
                                        <img className="shouzhang" src={this.state.Ip + "/images/a6g.png"} alt="" onClick={this.clickadd.bind(this, obj)} />
                                    </div>
                                </div>
                            )
                            // controls="controls"
                        }
                    })
                }
            </div>
        )
    }
    // 控制层
    componentDidMount() {
        axios.post(this.state.Ip + "/listMusics").then((msg) => {
            this.props.dispatch(musicShuju(msg.data))
        })
    }

    // 点击下一首
    clickadd() {
        this.state.number = 0;
        let musicelt = document.getElementById("musicelt")
        console.log(musicelt.duration)
        let srcs = document.getElementById("srcs")
        let xuanzhuan = document.getElementById("xuanzhuan")
        this.state.indexData++;
        if (this.state.indexData < this.state.musicdata.length) {
            srcs.src = "http://192.168.43.13:4444/images/a6i.png"
            this.setState({
                text: ["", this.props.oneMusic[this.state.indexData]._id],
            })
            this.numberSetint()
        } else {
            this.state.indexData = 0;
        }
    }
    // 点击上一首
    clickDel() {
        let musicelt = document.getElementById("musicelt")
        this.state.indexData--;
        if (this.state.indexData < 0) {
            this.state.indexData = this.state.musicdata.length;
        } else {
            this.setState({
                text: ["", this.props.oneMusic[this.state.indexData]._id],
            })
            this.numberSetint()
        }
    }
    // 进度条函数
    numberSetint() {
        let musicelt = document.getElementById("musicelt")
        setInterval(()=>{
            this.state.number++;
           this.setState({
                number:this.state.number
            })
        },musicelt.duration/100*1000)
    }

    // 音乐暂停
    clickMusic(e) {
        let musicelt = document.getElementById("musicelt")
        let xuanzhuan = document.getElementById("xuanzhuan")
        if (this.state.playerStatus) {
            this.numberSetint()
            musicelt.play();
            e.target.src = this.state.imgstrue;
            this.state.playerStatus = false;
            xuanzhuan.className = "classxunzhun"
        } else {
            // this.state.numberJIsh = this.state.number
            musicelt.pause();
            this.state.playerStatus = true;
            e.target.src = this.state.imgsfalse;
            xuanzhuan.className = "suspended"
        }
    }
}

function filter(state) {
    return {
        oneMusic: state.oneMusic
    }
}
export default connect(filter)(ListMusucs)
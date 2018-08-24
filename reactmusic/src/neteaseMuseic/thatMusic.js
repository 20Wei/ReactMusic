import React, { Component } from 'react';

// 引入框架样式
import { Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

// 引入ajax
import axios from 'axios'
import '../neteaseMusicCss/thatMusic.css'
import '../neteaseMusicCss/musicHome.css'

// 引入css

class thatMusic extends Component {
    constructor(p) {
        super(p);
        this.state = {
            Ip: "http://192.168.43.13:4444",
            Ips: "http://192.168.43.13:3000",
            texts: ``,
            data: [],
            text: this.props.location.search.split("?"),

        }
    }
    render() {
        return (
            <div className="Bigdiv">
                <div className="topreddiv">
                    <h1 id="inputValue" className="inputdiv">搜索</h1>
                    <ul dangerouslySetInnerHTML={{
                        __html: this.state.texts
                    }}>
                    </ul>
                </div>
                <div className="optionDiv">
                    <span>单曲</span>
                    <span>歌手</span>
                    <span>专辑</span>
                    <span>歌单</span>
                    <span>视频</span>
                    <span>舞蹈</span>
                    <span>MV</span>
                    <span>ACG音乐</span>
                    <span>演奏</span>
                    <span>现场</span>
                </div>

                    <div>

                        {
                            this.state.data.map((arr)=>{
                                if(this.state.text[1] === arr._id){
                                    return (
                                        <Link className="musicName" key={arr._id} to={"/music?"+ arr._id}>{arr.languser}</Link>
                                    )
                                }
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
        axios.post(this.state.Ip + "/findMusiclist").then((msg) => {
            this.setState({
                data:msg.data
            })
        })
    }
    // findmovie(){
    //     let star= "";
    //     for(let obj of this.state.data){
    //         if(document.getElementById("inputValue").value == ""){
    //             this.state.texts += "";
    //         }else{
    //             this.state.texts += `<li>{obj.迪克牛仔-黄金十载精选}</li>`
    //         }
    //     }
    // }
    // onInput={this.input_search.bind(this)} prefix={<Icon type="search" />} 
    // input_search() {
    //     axios.post(this.state.Ip + "/findMusiclist").then((msg) => {
    //         console.log(msg.data)
    //         this.setState({
    //             data: msg.data
    //         })
    //     })
    //     this.findmovie();
    // }
    // findmovie() {
    //     let star = "";
    //     for (let obj of this.state.data) {
    //         if (document.getElementById("inputValue").value == obj.languser) {
    //             this.state.texts = `<li>${obj.languser}</li>`
    //         }
    //     }
    // }
}
export default thatMusic
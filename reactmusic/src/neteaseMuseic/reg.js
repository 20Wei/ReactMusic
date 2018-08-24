import React, { Component } from 'react';

// 引入框架样式
import { Input, Icon } from 'antd';
// 引入ajax
import axios from 'axios'


// 引入css
import '../neteaseMusicCss/reg.css'

class Reg extends Component {
    // 状态
    constructor(p) {
        super(p);
        this.state = {
            Ip: "http://192.168.43.13:4444",
            isText: ""
        }
    }
    // 视图
    render() {
        return (
            <div className="Bigdiv">
                <div className="Bigdiv-top">
                    <Icon type="left" style={{ fontSize: "3em", color: "white" }} />
                    <span className="phoneLogin">手机号注册</span>
                </div>

                <div className="contentDiv">
                    <form action="http://192.168.31.45:4444/musicReg" method="post">
                        <Input prefix={<Icon type="tablet" />} placeholder="输入手机号" size="large" name="phone" className="inputCss" onBlur={this.checkUser.bind(this)} style={{ height: "4em", lineHeight: "4em" }} />
                        <label>{this.state.isText}</label>
                        <Input prefix={<Icon type="unlock" />} type="password" name="pwd" placeholder="设置登陆密码，不少于6位" size="large" style={{ height: "4em" }} className="inputCss" />
                        <button type="danger" className="regBtn">下一步</button>
                    </form>
                </div>

                <div className="buttomDiv">
                    <a href="" style={{ textDecoration: "underline", fontSize: "1.5em", color: "gray" }}>其他注册方式</a>
                    <ul>
                        <li style={{ marginLeft: "-0.5em" }}><Icon type="wechat" /></li>
                        <li><Icon type="qq" /></li>
                        <li><Icon type="weibo" /></li>
                        <li style={{ marginRight: "0.5em" }}><Icon type="html5" /></li>
                    </ul>
                </div>
            </div>
        )
    }
    // 控制层
    checkUser(e) {
        axios.post(this.state.Ip + "/musicFind", { phone: e.target.value }).then((msg) => {
            console.log(msg.data)
            this.setState({
                isText: msg.data === "pass" ? "√" : "X用户名重复"
            })
        })
    }

}

export default Reg
import React, { Component } from 'react';

// 引入框架样式
import { Input, Icon, Button } from 'antd';
// 引入ajax
import axios from 'axios'
import { Link } from 'react-router-dom';


// 引入css
import '../neteaseMusicCss/login.css'

class Login extends Component {
    constructor(p) {
        super(p);
        this.state = {
            Ip: "http://192.168.43.13:4444"

        }
    }
    render() {
        return (
            <div className="Bigdiv">
                <div className="Bigdiv-top">
                    <Icon type="left" style={{ fontSize: "3em", color: "white" }} />
                    <span className="phoneLogin">手机号登陆</span>
                </div>

                <div className="contentDiv">
                    <Input prefix={<Icon type="tablet" />} placeholder="手机号" size="large" ref="phone" className="inputCss" style={{ height: "4em", lineHeight: "4em" }} />
                    <Input prefix={<Icon type="unlock" />} type="password" placeholder="密码" size="large" ref="pwd" style={{ height: "4em" }} className="inputCss" />

                    <Button type="danger" className="loginBtn" onClick={this.loginButton.bind(this)}>登陆</Button>

                    <Link to="/reg" style={{ textDecoration: "underline", fontSize: "1.5em", color: "gray" }}>点击注册</Link>
                </div>


            </div>
        )
    }

    // 控制层
    loginButton() {
        let param = {
            phone: this.refs.phone.input.value,
            pwd: this.refs.pwd.input.value
        }
        axios.post(this.state.Ip + "/musicUser", param).then((msg) => {
            if (msg.data === true) {
                this.props.history.push('/musicHome')
            }
        })
    }
}
export default Login
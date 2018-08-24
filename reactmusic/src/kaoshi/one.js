import React, { Component } from 'react';

// 引入框架样式
import { Input, Icon, Button } from 'antd';
// 引入ajax
import axios from 'axios'
import { Link } from 'react-router-dom';


// 引入css
import './one.css'

class Login extends Component {
    constructor(p) {
        super(p);
        this.state = {
            Ip: "http://192.168.43.13:4444",
            data: []

        }
    }
    render() {
        var obj, date;
        obj = new Date();
        date = obj.getYear() + "-";
        date += obj.getMonth() + "-";
        date += obj.getDay() + " ";
        date += obj.getHours() + ":";
        date += obj.getMinutes() + ":";
        date += obj.getSeconds();
        return (
            <div className="Bigdiv">
                <div className="div_content">
                    <h1>留言板</h1>
                    <div>
                        {
                            this.state.data.map((item) => {
                                return (
                                    <div className="content_divcontent" key={item._id}>
                                        <span>{item.name}:</span>
                                        <span>{item.content}</span>
                                        <span className="textnme">发表于：{item.time}</span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <h1>添加留言</h1>
                    <div>
                        <form action={this.state.Ip + "/getContent"} method="post">
                            <label>姓名：<input name="name" id="textinput" /></label>
                            <label>留言：</label><textarea name="content" id="text"></textarea>
                            <label>时间：<input type="hidden" name="time" value={date}/></label>
                            <button>提交</button>
                        </form>
                    </div>

                </div>


            </div>
        )
    }
    componentDidMount() {
        axios.post(this.state.Ip + "/findContent").then((msg) => {
            this.setState({
                data: msg.data,
            })
        })
    }
    // onClickBtn() {
    //     axios.post(this.state.Ip + "/getContent").then((msg) => {
    //         this.setState({
    //             data: msg.data
    //         })
    //     })
    //     console.log(document.getElementById("text").value)
    //     console.log(document.getElementById("textinput").value)
    // }

    // 控制层
}
export default Login
import React, { Component } from 'react';
// import Span from './span.js'
import { Table, Button, message, Input } from 'antd';
import axios from 'axios'
// import './app.css'
// 删除
import { Modal } from 'antd';
const confirm = Modal.confirm;
let id;
class Num extends Component {

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
        id = selectedRowKeys
        console.log(selectedRowKeys)
    }

    // 模型层
    constructor(p) {
        super(p);
        this.state = {
            data: [],
            dataSource: [],
            selectedRowKeys: [],
            columns: [{
                title: '姓名', dataIndex: 'name'
            }, {
                title: '年龄', dataIndex: 'age'
            }, {
                title: '性别', dataIndex: 'sex'
            }, {
                title: '婚否', dataIndex: 'marry'
            }, {
                title: '籍贯', dataIndex: 'city'
            }, {
                title: '工资', dataIndex: 'money'
            }],
            // 所有数据的额总条数
            totalcount: 0,
            // 每页显示条数
            defaultPageSize: 10
        }
    }
    // 增加框
    state = { visible: false }

    // 视图层
    render() {

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
        }
        return (<div>
            <Button onClick={this.showConfirm.bind(this)}>删除</Button>
            <Button type="primary" onClick={this.showModal.bind(this)}>添加</Button>
            <div>
                <Modal
                    title="增加信息"
                    visible={this.state.visible}
                    // 确定按钮
                    onOk={this.handleOk}
                    // 取消按钮
                    onCancel={this.handleCancel}
                >
                    <p>姓名：<Input placeholder="姓名" ref="name" style={{ width: "40%" }} /></p>
                    <p>性别：<Input placeholder="性别" ref="sex" style={{ width: "40%" }} /></p>
                    <p>年龄：<Input placeholder="年龄" ref="year" style={{ width: "40%" }} /></p>
                    <p>婚否：<Input placeholder="婚否" ref="marry" style={{ width: "40%" }} /></p>
                    <p>籍贯：<Input placeholder="籍贯" ref="money" style={{ width: "40%" }} /></p>
                    <p>工资：<Input placeholder="工资" ref="city" style={{ width: "40%" }} /></p>
                </Modal>
            </div>
            {/* 表格 */}
            <Table rowKey='_id' columns={this.state.columns} rowSelection={rowSelection} dataSource={this.state.dataSource}
                pagination={{ total: this.state.totalcount, defaultPageSize: this.state.defaultPageSize, onChange: this.changePage.bind(this) }}
            />

        </div>
        )
    }
    // 控制层
    // Didmout渲染页面成功
    componentDidMount() {
        this.findUsers()
    }
    // 查找信息
    findUsers(page = 1) {
        // find查找所有信息
        axios.post('http://127.0.0.1:4444/FindPeope', { page, rows: this.state.defaultPageSize }).then((msg) => {
            // 添加页面并且刷新
            this.setState({
                dataSource: msg.data.rows,
                totalcount: msg.data.total
            })
        })
    }
    // 刷新页面内容
    changePage(page) {
        this.findUsers(page)
    }

    // 增加框
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    // 确定
    handleOk = (e) => {
        if (this.refs.name.input.value === "" && this.refs.sex.input.value === "") {
            Modal.warning({
                title: '系统提示',
                content: '要先输入输入内容才能添加哦',
            });
        } else {
            this.addusers();

            message.success('增加成功');

        }
    }
    // 取消
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    // 增加函数
    addusers() {
        let parms = {
            name: this.refs.name.input.value,
            sex: this.refs.sex.input.value,
            year: this.refs.year.input.value,
            marry: this.refs.marry.input.value,
            money: this.refs.money.input.value,
            city: this.refs.city.input.value
        }
        axios.post('http://127.0.0.1:4444/AddPeope', parms).then((msg) => {
            this.setState({})
        })
        this.setState({
            visible: false
        });
        this.emcty();
    }
    // 清空emcty
    emcty() {
        // 清空        
        this.refs.name.input.value = ""
        this.refs.sex.input.value = ""
        this.refs.year.input.value = ""
        this.refs.marry.input.value = ""
        this.refs.money.input.value = ""
        this.refs.city.input.value = ""
    }
    // 删除
    showConfirm() {
        // 判断如果没有选中的话提示信息
        confirm({
            title: '你确定删除数据',
            content: '请选择 "取消" 还是 "确定" ',
            cancelText: "取消",
            okType: "确定",
            onOk() {
                if (id == undefined || id.length <= 0) {
                    Modal.warning({
                        title: '系统提示',
                        content: '请至少选择一行数据',
                    });
                } else {
                    this.delusers();
                }
            },
            onCancel() {
                console.log('返回');
            },
        });
    }

    // 删除函数
    delusers() {
        let arr = [];
        arr.push(id)
        console.log(arr)
        axios.post('http://127.0.0.1:4444/delPeope', { _id: arr }).then(function (data) {
            this.setState({})
        })
    }
}
export default Num;

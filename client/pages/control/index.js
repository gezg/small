const socketOpen = require('../../utils/socket.js');
const util = require('../../utils/util.js');

let addState = false, messageQueue = [];

Page({

    /**
     * 页面的初始数据
     */
    data: {
        socketStatus: '',
        message: '',
        txt: [],
        dis: ''
    },
    onReady() {
        this.socket = socketOpen('ws://www.gezg.top', {
            autoConnect: false
        });
    },
    bindKeyInput(e) {
        this.setData({
            message: e.detail.value
        })
    },
    /**
     * 切换开关
     */
    switchChange(e) {
        var checked = e.detail.value
        if (checked) {
            this.openSocket()
        } else {
            this.closeSocket()
        }
    },
    addUser(){
        if (!addState && this.socket && this.socket.connected){
            this.socket.emit('add user', 'wx智慧车');
            addState = true;
            this.setData({
                dis: 'dis'
            })
        }
    },
    /**
     * 发送消息
     */
    sendMessage() {
        if (this.data.message && this.socket && this.socket.connected){
            this.setTextObj({
                message: this.data.message
            });
            this.socket.emit('new message', this.data.message);
            this.setData({
                message: ''
            });
        }
    },
    addEvent() {
        let _this = this;
        //连接服务端成功
        this.socket.on('connect', function () {
            util.showSuccess('连接成功');
        });

        /**
         * 接收到服务端发来新的信息触发
         */
        this.socket.on('new message', function (data) {
            _this.setTextObj(data);
        });

        //连接失败
        this.socket.on('connect_error', function (data) {
            util.showSuccess('连接失败');
        });
        //连接超时
        this.socket.on('connect_timeout', function (data) {
            util.showSuccess('连接超时');
        });
        //连接无效
        this.socket.on('reconnect_failed', function (data) {
            util.showSuccess('连接无效');
        });
        //重新连接
        this.socket.on('reconnecting', function (data) { 
            //可以添加一个计数器, 判断重新连接超过6次后提示用户
            //if (global.reconnectFailCount >= 6) {  
                util.showSuccess('连接服务器失败，请检查您当前的网络');
            //}  
        });  
        //连接错误
        this.socket.on('error', function (data) {
            util.showSuccess('连接错误');
        });
        //断开连接
        this.socket.on('disconnect', function () {
            util.showSuccess('socket断开连接');
        });
        //重新连接失败
        this.socket.on('reconnect_error', function () {
            util.showSuccess('重新连接失败');
        });
        //ping
        this.socket.on('ping', function(data){
            console.log(' - ping' + data);
        });
        //pong
        this.socket.on('pong', function(data){
            console.log(' - pong' + data);
        });
    },
    openSocket() {
        util.showBusy('Socket连接中...')
        this.socket.open();
        this.addEvent();
        this.setData({ socketStatus: 'connect' })
    },
    closeSocket() {
        if (this.socket) {
            wx.closeSocket();
        }
        this.setData({ socketStatus: 'closed' })
    },
    setTextObj(data) {
        messageQueue.push(data.message);
        this.setData({
            txt: messageQueue.join('\n')
        });
    }
})
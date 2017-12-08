const socketOpen = require('../../utils/socket.js');
var util = require('../../utils/util.js');
var Tunnel = require('../../vendor/wafer2-client-sdk/index').Tunnel;
// pages/control/index.js
let socket = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tunnelStatus: '' ,
        message: '58 46 5a 11 05 01 D8 B0 4C D4 AC AC FF FF 45 4e 44'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // socket = socketOpen('wss://yg2wkyhf.ws.qcloud.la/qcloud/ws?tunnelId=e5f2c376-f70c-4908-ba88-e3b8a6d62be1&tcId=00bb398d527ee89be442c13708ce6542');
        // console.log(socket);


    
    },
    bindKeyInput(e){
        this.setData({
            message: e.detail.value
        })
    },
    openTunnel(){
        util.showBusy('信道连接中...')
        // 创建信道，需要给定后台服务地址
        var tunnel = this.tunnel = new Tunnel('https://yg2wkyhf.qcloud.la/weapp/tunnel')

        // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
        tunnel.on('connect', () => {
            util.showSuccess('重连成功');
            console.log('WebSocket 信道已连接')
            this.setData({ tunnelStatus: 'connected' })
        })

        tunnel.on('close', () => {
            console.log('WebSocket 信道已断开')
            this.setData({ tunnelStatus: 'closed' })
        })

        tunnel.on('reconnecting', () => {
            console.log('WebSocket 信道正在重连...')

        })

        tunnel.on('reconnect', () => {
            console.log('WebSocket 信道重连成功')
        })

        tunnel.on('error', error => {
            console.error('信道发生错误：', error)
        })

        // 监听自定义消息（服务器进行推送）
        tunnel.on('gezg', speak => {
            console.log('收到说话消息：', speak)
        })

        // 打开信道
        tunnel.open()

        this.setData({ tunnelStatus: 'connecting' })
    },
    /**
     * 切换开关
     */
    switchChange(e){
        var checked = e.detail.value
        if (checked) {
            this.openTunnel()
        } else {
            this.closeTunnel()
        }
    },
    /**
     * 发送消息
     */
    sendMessage(){
        if (!this.data.tunnelStatus || !this.data.tunnelStatus === 'connected') return false;
        // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
        if (this.tunnel && this.tunnel.isActive()) {
            // 使用信道给服务器推送「speak」消息
            this.tunnel.emit('speak', {
                'word': this.data.message
            });
        }
    },
    closeTunnel(){
        if (this.tunnel) {
            this.tunnel.close();
        }
        this.setData({ tunnelStatus: 'closed' })
    }
})
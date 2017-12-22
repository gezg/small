
const util = require('../utils/util.js');
//socket连接池变量
let addState = false, socketMsgQueue = [];

class ZhcSocket {
    constructor(option){
        this.option = Object.assign({
            url: 'wss://www.gezg.top'
        }, option || {})
    }

    //打开socket
    open(){
        wx.connectSocket({
            url: this.option.url
        });

        this.socketStatus = 'ready';
        util.showBusy('Socket连接中...')
        this.on();
    }
    //关闭socket
    close(){
        wx.closeSocket();
        this.socketStatus = 'closed';
    }

    state(){
        return this.socketStatus;
    }

    send(message){
        if (this.state() === 'connect'){
            wx.sendSocketMessage({
                data: message
            })
        }else{
            socketMsgQueue.push(message)
        }
    }

    on(){
        let _this = this;
        //连接服务端成功
        wx.onSocketOpen(function (res) {
            util.showSuccess('连接成功');
            _this.socketStatus = 'connect';
            for (var i = 0; i < socketMsgQueue.length; i++) {
                _this.send(socketMsgQueue[i])
            }
            socketMsgQueue = [];
            if (_this.option.success) {
                _this.option.success();
            }
        });

        //连接失败
        wx.onSocketError(function (res) {
            util.showSuccess('连接失败');
            _this.socketStatus = 'connect_error';
            if (_this.option.fail) {
                _this.option.fail('连接失败');
            }
        })
        //关闭
        wx.onSocketClose(function (res) {
            util.showSuccess('连接关闭');
            _this.socketStatus = 'disconnect';
            if (_this.option.fail) {
                _this.option.fail('连接关闭');
            }
        })
        //message
        wx.onSocketMessage(function (res) {
            if (_this.option.message){
                _this.option.message(res.data);
            }
        })
        
    }
}


/**
 * 封装常用函数
 */
module.exports = {
    /**
     * 获取登录授权
     */
    getAuthorization: () => {
        return new Promise((resolve, reject) => {
            wx.login({
                success: function (loginResult) {
                    console.log(loginResult)
                    wx.request({
                        //获取openid接口  
                        url: 'https://api.weixin.qq.com/sns/jscode2session',
                        method: 'GET',
                        data: {
                            appid: 'wxf830d19953e019aa',
                            secret: 'e9862c4d9850ea9a96e5a8266167874d',
                            js_code: loginResult.code,
                            grant_type: 'authorization_code'
                        },
                        success: function (res) {
                            if (res.statusCode == 200) {
                                resolve(res.data);
                            } else {
                                reject('重新登录');
                            }
                        },
                        fail: function (userError) {
                            reject('获取openid失败');
                        }
                    })
                },
                fail: function (userError) {
                    reject('请检查网络状态2');
                }
            });
        });

    },
    /**
     * 分享公共设置
     */
    shareAppMessage: (options)=>{
        return options ? options : {
            title: '自定义转发标题',
            path: 'pages/valid/index',
            success: function (res) {
                util.showSuccess('转发成功');
            }
        }
    },
    /**
     * socket类
     */
    socket: ZhcSocket
};
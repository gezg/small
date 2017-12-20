    // pages/item/index.js
var zhc = require('../../vendor/zhc.js');
const util = require('../../utils/util.js');

const modes = {
    type1: {
        send : '58 46 5a 11 05 01 D8 B0 4C D4 AC AC FF FF 45 4e 44',
        reply: '58 46 5a 11 05 02 D8 B0 4C D4 AC AC FF FF 45 4e 44'
    },
    type2: {
        send : '58 46 5a 11 05 03 D8 B0 4C D4 AC AC FF FF 45 4e 44',
        reply: '58 46 5a 11 05 04 D8 B0 4C D4 AC AC FF FF 45 4e 44'
    },
    type3: {
        send : '58 46 5a 11 05 05 D8 B0 4C D4 AC AC FF FF 45 4e 44',
        reply: '58 46 5a 11 05 06 D8 B0 4C D4 AC AC FF FF 45 4e 44'
    },
    type4: {
        send : '58 46 5a 11 05 07 D8 B0 4C D4 AC AC FF FF 45 4e 44',
        reply: '58 46 5a 11 05 08 D8 B0 4C D4 AC AC FF FF 45 4e 44'
    },
    //关闭按摩
    close: {
        send : '58 46 5a 11 05 D0 D8 B0 4C D4 AC AC FF FF 45 4e 44',
        reply: '58 46 5a 11 05 D1 D8 B0 4C D4 AC AC FF FF 45 4e 44'
    }
}

Page({
    /**
     * 页面的初始数据
     */
    data: {
        luminous: false,
        handles: [
            {
                type: 'type1',
                name: '轻松',
                icon: 'relax'
            },
            {
                type: 'type2',
                name: '舒适',
                icon: 'toning'
            },
            {
                type: 'type3',
                name: '轻松',
                icon: 'relax'
            },
            {
                type: 'type4',
                name: '舒适',
                icon: 'toning'
            }
        ],
        modes: [
            {
                type: 'knead',
                name: '按摩',
            },
            {
                type: 'aeration',
                name: '通风',
            },
            {
                type: 'warm',
                name: '加热',
            }
        ],
        currType: 'type1',
        currModeType: 'knead'
    },

    onReady: function (options) {
        //初始化socket类
        this.socket = new zhc.socket({
            url: 'wss://yg2wkyhf.ws.qcloud.la',
            message: this.message
        });
        //打开连接
        this.socket.open();

        // setInterval(function(){
        //     sk.send('gezg ' + Math.round(Math.random() * 0xFFFFFF).toString());
        // }, 2000);
        
    },
    message(res){
        console.log(res)
    },
    sendSocket(){
        this.socket.send(modes[this.data.currType].send);
    },
    /**
     * 选择模式
     */
    selectType(event){
        let currType = event.currentTarget.dataset.type;
        let ctype = event.currentTarget.dataset.mode;
        if (ctype == 'mode'){
            this.setData({
              currModeType: currType
            })
        }else{
            this.setData({
                currType: currType
            });
            this.sendSocket();
        }
    },
    /**
     * 开启关闭按摩
     */
    toggleLuminous(){
        this.setData({
            luminous: !this.data.luminous
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    getMode(){


    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: zhc.shareAppMessage
})
var waves = require('../../vendor/siriwave.js');
var util = require('../../utils/util.js');
const App = getApp();
// pages/phone/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnText: '确定',
        placeholderText: '输入验证码',
        inputValue: '',
        validMsg: '获取验证码',
        sendClass: ''
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
        let _this = this;
        _this.total = 60;
        _this.opt = {
            phase : 0
        }

        wx.getSystemInfo({
            success(res) {
                //获取手机系统信息
                _this.width = res.windowWidth + 5;
                _this.height = res.windowHeight;
                _this.step = 0;

                _this.drawWaves();
                _this.interval = setInterval(_this.drawWaves, 17)

            }
        });
    },

    drawWaves: function () {
        let _this = this;
        let context = wx.createContext();
        //设置波浪线路径
        waves.set(context, _this.width);
        //获取当前context上存储的绘图动作
        let actions = context.getActions();
        //绘制
        wx.drawCanvas({
            canvasId: 'canvas',
            actions: actions
        })
    },
    getValid: function(){
        let _this = this;
        if (_this.total == 60){
          wx.request({
            //获取openid接口  
            url: 'http://47.92.37.228:1024/remoteseat/index.php?mod=mobile&name=shopwap&do=sms',
            method: 'GET',
            data: {
              phone: App.globalData.phone
            },
            success: function (res) {
              if (res.data.data == '1'){
                util.showSuccess('发送成功');
              }else{
                util.showModel('服务器返回' ,res.data.msg);
              }
            },
            fail: function (err) {
              util.showSuccess('短信发送失败！');
            }
          })
           
            //发送验证码成功后,后台返回手机验证码
            _this.validTimer = setInterval(function () {
                _this.counter();
            }, 1000);
        }
    },
    counter: function (){
        let _this = this;
        _this.setData({
            validMsg: '重新获取' + _this.total,
            sendClass: 'active'
        });
        _this.total--;
        if (!_this.total){
            _this.total = 60;
            clearInterval(_this.validTimer);
            _this.setData({
                validMsg: '获取验证码',
                sendClass: ''
            });
        }
    },
    bindKeyInput: function(e){
        this.setData({
            inputValue: e.detail.value
        })
    },
    ok: function(){
        //确定用户有输入后,发送注册请求
      if (this.data.inputValue){
            //TODO
            util.showSuccess('发送注册请求');
            wx.navigateTo({
                url: '../scanning/index',
            })
        }
    },
    onUnload: function () {
        clearInterval(this.interval)
    }
})
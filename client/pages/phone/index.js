var waves = require('../../vendor/siriwave.js');
var util = require('../../utils/util.js');
var zhc = require('../../vendor/zhc.js');
var qcloud = require('../../vendor/wafer2-client-sdk/index');


const App = getApp();
// pages/phone/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnText: '下一步',
        placeholderText: '请输入手机号码',
        inputValue: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      //获取用户微信openid
        zhc.getAuthorization().then((data)=>{
        util.showSuccess('获取openid成功');
        App.globalData.openid = data.openid;
        App.globalData.session_key = data.session_key;
        //向后台发送接口，判断用户是否已注册
        //如已注册则直接跳到扫描二维码绑定页面或者按摩页面
        //如未注册则保存openid和session即可留在当前页面
        // wx.request({
        //   //获取openid接口  
        //   url: 'https://api.weixin.qq.com/sns/jscode2session',
        //   method: 'GET',
        //   data: {
        //     openid: App.globalData.openid
        //   },
        //   success: function (res) {
            
        //   }
        // })
      }).catch((error)=>{
        util.showSuccess(error);
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let _this = this;

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
    nextStep: function(){
        if (this.isPhoneNum(this.data.inputValue)){
            App.globalData.phone = this.data.inputValue;
            wx.navigateTo({
                url: '../valid/index',
            });
        }else{
            util.showModel('错误提示' ,'手机号码格式不正确');
        }
    },
    bindKeyInput: function (e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    /**
     * 
     * @desc   判断是否为手机号
     * @param  {String|Number} str 
     * @return {Boolean} 
     */
    isPhoneNum: function(str){
        return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
    },
    onUnload: function () {
        clearInterval(this.interval)
    },
    onShareAppMessage: zhc.shareAppMessage
})
var waves = require('../../vendor/siriwave.js')
// pages/phone/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnText: '下一步',
        placeholderText: '请输入手机号码'
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
        if (this.data.btnText == '确定'){
            wx.navigateTo({
                url: '../index/index',
            })
            return false;
        }
        this.setData({
            btnText: '确定',
            placeholderText: '输入验证码'
        })
    },
    onUnload: function () {
        clearInterval(this.interval)
    }
})
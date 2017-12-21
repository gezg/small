// pages/scanning/index.js

var zhc = require('../../vendor/zhc.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    scanningCode: function(){
      wx.navigateTo({
        url: '../item/index',
      })
        // wx.scanCode({
        //     success: function (res) {
        //         wx.showModal({
        //             title: '扫描结果',
        //             content: res.result,
        //             showCancel: false
        //         })
        //     },
        //     fail: function (res) {
        //         wx.showModal({
        //             title: '扫描结果',
        //             content: '扫描失败',
        //             showCancel: false
        //         })
        //     }
        // })
    },
    onShareAppMessage: zhc.shareAppMessage
})
// pages/scanning/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

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

    },

    scanningCode: function(){
        wx.scanCode({
            success: function (res) {
                wx.showModal({
                    title: '扫描结果',
                    content: res.result,
                    showCancel: false
                })
            },
            fail: function (res) {
                wx.showModal({
                    title: '扫描结果',
                    content: '扫描失败',
                    showCancel: false
                })
            }
        })
    }
})
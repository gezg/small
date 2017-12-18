    // pages/item/index.js
    Page({

    /**
     * 页面的初始数据
     */
    data: {
        luminous: false,
        handles: [
            {
                type: 'type1',
                name: '轻松1',
                icon: 'relax'
            },
            {
                type: 'type2',
                name: '轻松2',
                icon: 'toning'
            },
            {
                type: 'type3',
                name: '轻松3',
                icon: 'relax'
            },
            {
                type: 'type4',
                name: '轻松4',
                icon: 'toning'
            }
        ],
        modes: [
            {
                type: 'knead1',
                name: '按摩',
            },
            {
              type: 'knead2',
              name: '通风',
            },
            {
              type: 'knead3',
              name: '加热',
            }
        ],
        currType: 'type1',
        currModeType: 'knead1'
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
            })
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
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
    })
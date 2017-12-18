const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

var getAuthorization = () => {
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
            if (res.statusCode == 200){
              resolve(res.data);
            }else{
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
 
}

module.exports = { 
  formatTime, 
  showBusy, 
  showSuccess, 
  showModel, 
  getAuthorization
}

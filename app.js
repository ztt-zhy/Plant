//app.js
App({
  onLaunch: function () {
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    // 2020-11-26
    wx.getSetting({
      // 用户获取当前小程序授权状态
      success(res) {
        console.log(res.authSetting["scope.userInfo"])
        // 判断它是否为true
        if (res.authSetting["scope.userInfo"]) {
          //  证明我已经授权过
          console.log("授权")
        } else {
          //  未授权，就跳转到授权的button按钮页面，也可以是个人信息页面
          console.log("未授权")
          // 先跳转至用户授权登录页面
          wx.navigateTo({
            url: '../../pages/login/login',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
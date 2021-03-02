let {
  ajaxLogin,
  ajaxZhu
} = require("../../utils/request");
Page({
  /**
   * 页面的初始数据
   */
  data: { // 授权后就进行渲染-头像-昵称-性别
    userInfo: {}, //对象nickName:昵称，gender性别，url头像地址
    encryptedData: '',
    iv: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  getUserInfo(e) { // 用户授权登录
    this.data.encryptedData = e.detail.encryptedData
    this.data.iv = e.detail.iv
    this.setData({
      userInfo: e.detail.userInfo
    });
    this.login(); // 调用方法
  },
  // 登录**   // 进入授权button的binggetuserinfo回调   // 调用 wx.login获取code
  login() {
    wx.login({
      success: async (res) => {
        console.log(res.code); // 打印临时凭证
        if (res.code) {
          let { //发起网络请求
            data
          } = await ajaxLogin(res.code);

          if (data.code != 10000) {
            // 登录
            wx.setStorage({ // 进行存储
              data: data.data.token, //存储得是token
              key: 'token',
            })
            // 提示授权成功
            wx.showToast({
              title: '授权成功',
              icon: 'success',
              duration: 2000
            })
            // 进入首页
            wx.switchTab({
              url: '../index/index',
            })
          } else {
            // 注册
            this.zhuce()
          }
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
  },
  // 注册
  zhuce() {
    wx.login({
      success: async res => {
        let {
          data: hh
        } = await ajaxZhu({
          code: res.code,
          encryptedData: this.data.encryptedData,
          iv: this.data.iv
        })
        if (hh.code == 0) {
          this.login()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});
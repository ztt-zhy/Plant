let {
  request
} = require("../../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list: [],
    picc: {}
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
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    let token = wx.getStorageSync("token")
    let {
      data: ord
    } = await request(
      `https://api.it120.cc/zhangtt/order/list`, {
        "token": token
      }, "POST"
    );
    // 提示授权成功
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    console.log(ord)
    this.setData({
      list: ord.data.orderList,
      picc: ord.data.goodsMap
    })
    console.log(this.data.picc)
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
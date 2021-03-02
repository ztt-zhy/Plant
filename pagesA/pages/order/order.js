let {
  request
} = require("../../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    currentTab: 0,
    left: 1,
    bear: [], // 列表左侧数据
    tokens: '',
    kk: [],
    allPre: 0.00
  },
  // 提交订单
  async jump() {
    let that = this
    // 获取本地存储的token头
    console.log(that.data.kk)
    let arr = []

    for (let i = 0; i < that.data.kk.length; i++) {
      let obj = {
        goodsId: that.data.kk[i].goodsId,
        number: that.data.kk[i].number
      }
      arr.push(obj)
    }
    console.log(arr)
    wx.getStorage({
      key: 'token',
      success: async function (res) {
        console.log(res)
        let {
          data: ech
        } = await request(
          "https://api.it120.cc/zhangtt/order/create", {
            token: res.data,
            goodsJsonStr: JSON.stringify(arr)
          }, "POST"
        );
        console.log(ech)
        let {
          data: echs
        } = await request(
          "https://api.it120.cc/zhangtt/shopping-cart/empty", {
            token: res.data
          }, "POST"
        );
        console.log(echs)
      }
    })
    wx.switchTab({
      url: "../../../pages/list/list"
    })

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
    let that = this
    // 获取本地存储的token头
    wx.getStorage({
      key: 'token',
      success: async function (res) {
        console.log(res)
        let {
          data: jj
        } = await request(
          `https://api.it120.cc/zhangtt/shopping-cart/info?token=${res.data}`
        );
        // 提示授权成功
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        console.log(jj)
        that.setData({
          kk: jj.data.items,
          allPre: jj.data.price
        })
      }

    })
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
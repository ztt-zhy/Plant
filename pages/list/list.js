let {
  request
} = require("../../utils/request");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    currentTab: 0,
    left: 1,
    bear: [], // 列表左侧数据
    flower: [], // 右侧数据
    tokens: ''
  },

  //   点击事件  存储左侧id，右边重复调用覆盖
  switchNav: function (e) {
    wx.setStorageSync('key', e.currentTarget.id)
    this.diaoyong()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    wx.getStorage({
      key: 'token',
      success: res => {
        console.log(res)
        this.setData({
          tokens: res.data
        })
      }
    })
    // 左侧列表
    let {
      data
    } = await request(
      "https://api.it120.cc/zhangtt/shop/goods/category/all"
    );

    this.data.bear = data.data;
    this.data.left = data.data[0].id
    // 更新视图
    this.setData({
      bear: data.data,
    });
    this.diaoyong()
  },

  //   调用得函数  右边得数据  每次点击会重复请求调用
  async diaoyong() {
    //   进入页面先进入固定显示得 this.data.left = data.data[0].id
    let id = wx.getStorageSync('key') || this.data.left;

    // 右侧列表
    let {
      data: you
    } = await request(
      "https://api.it120.cc/zhangtt/shop/goods/list", {
        categoryId: id
      },
      "POST"
      
    );
  
    this.setData({
      flower: you.data,
      left: id
    });
  },
  // 购物车按钮点击事件
  async Sjump(e) {
    console.log(e.currentTarget.dataset.id)
    // 添加购物车
    let {
      data: che
    } = await request(
      "https://api.it120.cc/zhangtt/shopping-cart/add", {
        goodsId: e.currentTarget.dataset.id,
        number: 1,
        token: this.data.tokens
      },
      "POST"
    );
    console.log(che)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},


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
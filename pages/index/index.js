let { request } = require("../../utils/request");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pic: [], // 轮播图
    sort: [],
    // 秒杀
    time: 30 * 60 * 60 * 1000,
    timeData: {},
    currentValue: 1,
    jiu: [], // 九宫格
    baok: [], //爆款
    lieb: [], //列表
    num: 4, //变量
    xs: false //是否显示
  },
  // 九宫格点击事件
  jumpList(e) {
    // console.log(e.currentTarget.dataset.id);  //拿到当前点击得id
    wx.setStorageSync("key", e.currentTarget.dataset.id);

    wx.switchTab({
      url: "../list/list"
    });
  },

  // 滑块
  onDrag(event) {
    this.setData({
      currentValue: event.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let { data } = await request("https://api.it120.cc/zhangtt/banner/list");
    // 轮播图
    this.data.pic = data.data;

    // 九宫格
    let { data: res } = await request(
      "https://api.it120.cc/zhangtt/shop/goods/category/all"
    );

    console.log(res);
    // 爆款
    let { data: bao } = await request(
      "https://api.it120.cc/zhangtt/shop/goods/list?recommendStatus=1"
    );

    // 商品列表
    let { data: list } = await request(
      "https://api.it120.cc/zhangtt/shop/goods/list?pageSize=4"
    );
    // 更新视图
    this.setData({
      pic: this.data.pic,
      jiu: res.data,
      baok: bao.data,
      lieb: list.data
    });
  },
  onChange(e) {
    this.setData({
      timeData: e.detail
    });
  },

  // 广告点击跳转
  jump() {
    wx.navigateTo({
      url: "../../pagesA/pages/hot/hot"
    });
  },

  // 分享领卷
  gain() {
    wx.navigateTo({
      url: "../../pagesA/pages/discount/discount"
    });
  },
  // 立即抢购
  buying() {
    wx.navigateTo({
      url: "../../pagesA/pages/buying/buying"
    });
  },
  // 爆款推荐 小兔子
  rabbit() {
    wx.navigateTo({
      url: "../../pagesA/pages/biguanghuang/biguanghuang"
    });
  },

  // 商品列表点击进入详情页
  mostCady(e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: `../../pagesA/pages/mostCady/mostCady?id=${e.currentTarget.dataset.id}`
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function() {
    // 触底再次进行请求
    this.data.num += 2;
    this.setData({
      num: this.data.num
    });
    console.log(this.data.num);
    let { data: list } = await request(
      `https://api.it120.cc/zhangtt/shop/goods/list?pageSize=${this.data.num}`
    );
    this.setData({
      lieb: list.data
    });
    if (this.data.num >= 10) {
      this.setData({
        xs: true
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});

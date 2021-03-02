let {
  request
} = require("../../utils/request");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    kk: [],
    allPre: 0.00
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
        console.log(jj)
        // 判断购物车是否为空，为空显示空图提示，否则显示数据
        if (jj.code == 700) {
          that.data.show
          that.setData({
            show: false
          })

        } else {
          // 提示授权成功
          wx.showToast({
            title: '已加入购车车',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            kk: jj.data.items,
            allPre: jj.data.price,
            show: true
          })

        }
      }
    })
  },
  // 删除
  async ondel(e) {
    console.log(e.currentTarget.dataset.k)
    let that = this
    wx.getStorage({
      key: 'token',
      success: async function (res) {
        console.log(res)
        let {
          data: shan
        } = await request("https://api.it120.cc/zhangtt/shopping-cart/remove", {
          token: res.data,
          key: e.currentTarget.dataset.k
        }, "POST")
        console.log(shan)
        if (shan.code == 700) {
          that.data.show
          that.setData({
            show: false
          })
        } else {
          that.setData({
            kk: shan.data.items,
            allPre: shan.data.price,
            show: true
          })
        }
      }
    })
  },
  // 加减
  onChange(e) {
    console.log(e.currentTarget.dataset.i)
  },
  // 减
  jian(e) {
    let that = this
    console.log(e.currentTarget.dataset.i)
    e.currentTarget.dataset.i-- //自增
    if (e.currentTarget.dataset.i == 0) {
      that.ondel(e)
    } else {
      wx.getStorage({
        key: 'token',
        success: async function (res) {
          console.log(res)
          // 访问
          let {
            data: li
          } = await request(
            "https://api.it120.cc/zhangtt/shopping-cart/modifyNumber", {
              token: res.data,
              key: e.currentTarget.dataset.k,
              number: e.currentTarget.dataset.i
            }, "POST"
          );
          console.log(li)
          // 更新视图
          that.setData({
            kk: li.data.items,
            allPre: li.data.price,
          })
        }
      })
    }


  },
  // 加
  jia(e) {
    let that = this
    console.log(e.currentTarget.dataset.i)
    e.currentTarget.dataset.i++ //自增
    wx.getStorage({
      key: 'token',
      success: async function (res) {
        console.log(res)
        // 访问
        let {
          data: li
        } = await request(
          "https://api.it120.cc/zhangtt/shopping-cart/modifyNumber", {
            token: res.data,
            key: e.currentTarget.dataset.k,
            number: e.currentTarget.dataset.i
          }, "POST"
        );
        console.log(li)
        // 更新视图
        that.setData({
          kk: li.data.items,
          allPre: li.data.price,
        })
      }
    })
  },
  // 点击结算
  jumpq() {
    wx.navigateTo({
      url: '../../pagesA/pages/order/order',
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
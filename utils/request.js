let request = function(url, data = {}, method = "GET") {
  wx.showLoading({
    title: "加载中"
  });

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method, //请求方式
      // 请求头
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      success: res => {
        resolve(res);
      },
      fail(res) {
        reject(res);
      },
      complete() {
        wx.hideLoading();
      }
    });
  });
};
// 封装API
let params = {
  url: "https://api.it120.cc/" //前端接口地址
};

// 登录请求接口的方法
let ajaxLogin = function(code) {
  return request(params.url + "zhangtt/user/wxapp/login", {code}, "POST");
};

// 注册请求接口
let ajaxZhu=function(hrj){
  return request(params.url+"zhangtt/user/wxapp/register/complex",hrj,"POST")
}

module.exports = { request, ajaxLogin,ajaxZhu }; //导出

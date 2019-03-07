// pages/login.js
const { $api } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dealers: [],
    params: {
      mobile: '',
      password: '',
      dealerno: null,
    },
    index: 0,
  },
  bindDealerChange({ detail: { value } }) {
    console.log(value);
    this.setData({
      index: value,
      'params.dealerno': this.data.dealers[value].dealerno
    })
  },
  formSubmit({ detail: { value } }) {
    //console.log('form发生了submit事件，携带数据为：', value);

    $api.login(value).then(({ code, data, msg }) => {
      if (code != 200) {
        return wx.showToast({
          title: msg,
          icon: "none"
        });
      }
      wx.setStorageSync("userInfo", data);
      wx.setStorageSync("dealerInfo", this.data.dealers[this.data.index]);

      wx.reLaunch({
        url: '/pages/home/index',
      })

    });

  },
  formReset() { },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $api.dealerList().then(({ data }) => {
      this.setData({
        dealers: data,
        'params.dealerno': data[this.data.index].dealerno
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
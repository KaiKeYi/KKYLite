//index.js
//获取应用实例
const { $api } = getApp();

Page({
  data: {
    indicatorDots: true,
    imgUrls: [
      "/assets/images/banner.png", "/assets/images/banner.png"
    ],
    imgH: '',
    imgW: '',

    rows: []
  },
  // //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // doTap({ target: { dataset: { id } } }) {
  //   console.log(id);
  // },
  onLoad: function () {
    // wx.getImageInfo({
    //   src: "/assets/images/banner.png",
    //   success: (res) => {
    //     console.log(res);
    //     this.setData({
    //       imgH: res.height,
    //       imgW: res.width
    //     })
    //   }
    // });

    this.getCourseList();

  },
  getCourseList: function (e) {
    const { dealerno } = wx.getStorageSync('dealerInfo');
    $api.getCourseList({ dealerno }).then(({ data }) => {

      // const imglist = ['http://img.zcool.cn/community/0130235aae75dea80121246d3ec4ed.jpeg@260w_195h_1c_1e_1o_100sh.jpg',
      //   'http://img.zcool.cn/community/01009c5aaf48e0a80120be1426dc32.jpeg@260w_195h_1c_1e_1o_100sh.jpg',
      //   'http://img.zcool.cn/community/0197145aab5f44a80120be1447d18d.jpeg@260w_195h_1c_1e_1o_100sh.jpg'
      // ]

      this.setData({
        rows: data
      })
    });
  },
  toDetail({ currentTarget: { dataset: { course } } }) {
    //console.log(course)
    let queryStringArr = [];
    for (let key in course) {
      queryStringArr.push(`${key}=${course[key]}`);
    }
    wx.navigateTo({
      url: `/pages/product/detail?${queryStringArr.join('&')}`,
    })
  }
})

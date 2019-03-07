// pages/product/detail.js

import { formatTime } from '../../utils/util.js'
const { $api } = getApp();
let { dealerno } = wx.getStorageSync('dealerInfo');
Page({
  dealerno,
  /**
   * 页面的初始数据
   */
  data: {
    courseInfo: {},
    days: [],
    dayIndex: 0,
    times: [],
    teachers: [],
    animationData: {},
  },
  timeActive: 0,
  selectedTime: {},
  doSubmit() {

    let { time_start, teacher: { tid } } = this.data.times[this.timeActive];
    let { course, classroom } = this.data.courseInfo;
    if (!tid) {
      wx.showToast({
        icon: 'none',
        title: '请选择时间',
      });
      return false;
    }
    $api.getYuYueAdd({
      course,
      classroom,
      dealerno,
      tid,
      date: this.data.days[this.data.dayIndex].date,
      time_start
    }).then(({ code, data, msg }) => {
      wx.showToast({
        icon: "none",
        title: msg,
      })
    });
  },
  doReset() {
    this.setData({
      times: this.data.times.map((item) => {
        item.teacher = {};
        return item;
      })
    })
    this.selectedTime = null;
  },
  doSelectItem({ target: { dataset: { item } } }) {
    console.log(item);
    let times = this.data.times.map((time, index) => {
      if (time.time_start == this.selectedTime.time_start) {
        time.teacher = item;
        this.timeActive = index;
      }
      else {
        //如果是多选 就把这个注释掉
        time.teacher = {};
      }
      return time;
    });
    this.setData({
      times,
      teachers: []
    });
  },
  tapMark({ target: { id } }) {
    if (id == 'mark') {
      this.setData({
        teachers: []
      })
    }
  },
  bindChange({ detail: { value } }) {
    console.log(this.data.teachers[value]);
    let times = this.data.times.map((time, index) => {
      if (time.time_start == this.selectedTime.time_start) {
        time.teacher = this.data.teachers[value];
        this.timeActive = index;
      }
      else {
        //如果是多选 就把这个注释掉
        time.teacher = {};
      }
      return time;
    });
    this.setData({
      times
    });
  },
  doSelectTeacher({ target: { dataset: { item } } }) {
    if (!item.can_order) return false;
    this.selectedTime = item;
    let { course, classroom } = this.data.courseInfo;
    $api.getCourseAvaliableTeachers({
      course,
      classroom,
      dealerno,
      date: this.data.days[this.data.dayIndex].date,
      time_start: item.time_start
    }).then(({ data: teachers }) => {
      //console.log(teachers);
      this.setData({
        teachers: teachers.filter(item => item.name)
      });

      console.log(this.data.teachers);
      // wx.showActionSheet({
      //   itemList: teachers.map(item => item.name),
      //   success: ({ tapIndex }) => {
      //     //console.log(tapIndex,'tapIndex');
      //     let times = this.data.times.map((time, index) => {

      //       if (time.time_start == item.time_start) {
      //         time.teacher = teachers[tapIndex];
      //         this.timeActive = index;
      //       }
      //       else {
      //         //如果是多选 就把这个注释掉
      //         time.teacher = {};
      //       }
      //       return time;
      //     });
      //     this.setData({
      //       times
      //     });
      //   }
      // })
    });

  },
  doChangeDate({ currentTarget: { dataset: { index, item } } }) {

    this.getTime(item);

    this.setData({
      dayIndex: index
    });
  },
  getDate({ course, classroom }) {
    //let today = new Date();
    let { dealerno } = wx.getStorageSync('dealerInfo');

    $api.getCourseAvaliableDate({
      course,
      classroom,
      dealerno
    }).then(({ data }) => {
      let days = data.filter((item, index) => index < 7);
      this.setData({
        days
      });
      this.getTime(days[0]);
    });
  },
  getTime({ date }) {
    //let today = new Date();
    let { dealerno } = wx.getStorageSync('dealerInfo');
    let { course, classroom } = this.data.courseInfo;

    $api.getCourseAvaliableTime({
      course,
      classroom,
      dealerno,
      date
    }).then(({ data }) => {
      this.setData({
        times: data.map(item => {
          return { ...item, teacher: {} }
        })
      });
      // this.setData({
      //   days: data.filter((item, index) => index < 7)
      // });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getDate(options);

    this.setData({
      courseInfo: options
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
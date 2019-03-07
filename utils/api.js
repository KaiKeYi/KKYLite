import { ajax } from './async.js';
export default {
  dealerList(params = {}) {
    return new Promise((res, rej) => {
      ajax('api/dealer/list.json', params, (data) => {
        res(data);
      })
    })
  },
  login(params = {}) {
    return new Promise((res, rej) => {
      ajax('api/public/login.json', params, (data) => {
        res(data);
      })
    })
  },
  getCourseList(params) {
    let { token } = wx.getStorageSync("userInfo");
    if (!token) {
      wx.reLaunch({
        url: '/pages/login',
      })
      return { then() { } };
    };
    return new Promise((res, rej) => {
      ajax('api/course/list.json', { ...params, ...{ token } }, (data) => {
        res(data);
      })
    })
  },
  ///api/course/avaliableDate.json
  getCourseAvaliableDate(params = {}) {
    let { token } = wx.getStorageSync("userInfo");
    return new Promise((res, rej) => {
      ajax('api/course/avaliableDate.json', { ...params, ...{ token } }, (data) => {
        res(data);
      })
    })
  },
  //{{uri}}/api/course/avaliableTime.json
  getCourseAvaliableTime(params = {}) {
    let { token } = wx.getStorageSync("userInfo");
    return new Promise((res, rej) => {
      ajax('api/course/avaliableTime.json', { ...params, ...{ token } }, (data) => {
        res(data);
      })
    })
  },
  //{{uri}}/api/course/avaliableTeachers.json
  getCourseAvaliableTeachers(params = {}) {
    let { token } = wx.getStorageSync("userInfo");
    return new Promise((res, rej) => {
      ajax('api/course/avaliableTeachers.json', { ...params, ...{ token } }, (data) => {
        res(data);
      })
    })
  },
  //{{uri}}/api/yuyue/add.json
  getYuYueAdd(params = {}) {
    let { token } = wx.getStorageSync("userInfo");
    return new Promise((res, rej) => {
      ajax('api/yuyue/add.json', { ...params, ...{ token } }, (data) => {
        res(data);
      })
    })
  },
  //{{uri}}/api/yuyue/my.json
  getYuYueMy(params = {}) {
    let { token } = wx.getStorageSync("userInfo");
    return new Promise((res, rej) => {
      ajax('api/yuyue/my.json', { ...params, ...{ token } }, (data) => {
        res(data);
      })
    })
  },
  logout(params = {}) {
    let { token } = wx.getStorageSync("userInfo");
    return new Promise((res, rej) => {
      ajax('api/public/logout.json', { ...params, ...{ token } }, (data) => {
        res(data);
      })
    })
  },
}
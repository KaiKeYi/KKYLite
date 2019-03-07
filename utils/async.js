import config from './config.js'

export const ajax = function (api, data = {}, callback = function () { }, method = "POST") {
  return wx.request({
    url: `${config.apiUrl}/${api}`,
    data,
    method,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      //'content-type': 'application/json',
    },
    // complete(...args) {
    //   console.log(args);
    // },
    success({ data, statusCode, header }) {
      // console.log(statusCode, header);
      // let { route } = getCurrentPages();
      // if (statusCode == 400 && header['content-type'] == "text/html" && route != '/pages/login') {
      //   //console.log(getCurrentPages());
      //   return wx.reLaunch({
      //     url: '/pages/login',
      //   })
      // }
      callback(data);
    }
  })
}

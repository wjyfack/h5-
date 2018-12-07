const host = 'http://cdzj.demo.com/Apiapi'
// let session_id = wx.getStorageSync('userData').session_id == undefined ? '' : wx.getStorageSync('userData').session_id

export const param = '&d=wx_minprogram&s='+wx.getStorageSync('userData').session_id //(wx.getStorageSync('userData').session_id == undefined ? '' : wx.getStorageSync('userData').session_id)
export const oHost= 'http://cdzj.demo.com/'
export default {
    host,
    param
  }
  
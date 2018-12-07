function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function getBrand(str) {
  let brand = []
  str.indexOf(',1,') >0 ? brand.push(1): ''
  str.indexOf(',2,') >0 ? brand.push(2) : ''
  str.indexOf(',3,') >0 ? brand.push(3): ''
  return brand
}
export function getParam() {
  return '&d=wx_minprogram&s='+(wx.getStorageSync('userData').session_id == undefined ? '' : wx.getStorageSync('userData').session_id)
}
export function getStar(num) {
  return ~~(num /20)
}
export default {
  getBrand
  ,formatTime
  ,formatNumber
  ,getParam
  ,getStar
}

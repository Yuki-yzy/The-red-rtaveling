//index.js
const app = getApp()
const { envList } = require('../../envList.js')

Page({
  data: {

  },
  skip() {
    wx.navigateTo({
      url: '/pages/details/index',
    })
  },
  strategy() {
    wx.navigateTo({
      url: '/pages/strategy/index',
    })
  },
  jingGangShan() {
    wx.navigateTo({
      url: '/pages/jingGangShan/index',
    })
  },
  ya() {
    wx.navigateTo({
      url: '/pages/yanan/index',
    })
  }
})

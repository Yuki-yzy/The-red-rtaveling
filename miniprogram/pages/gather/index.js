// pages/gather/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initial:[],
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    const db = wx.cloud.database()
    // const users = db.collection('users') 
    let that = this
    // db.collection('users').where({
    //   type: 'host'
    // }).get()
    // .then(r=>{
    //   that.setData({ 
    //     list:r.data
    //   })
    //   console.log(that.data.list.length)
    // })
    db.collection('users').where({
      type: 'guest'
    }).get()
    .then(r=>{
      that.setData({ 
        initial:r.data
      })
      let length = that.data.initial.length
      // console.log(that.data.initial[length-1].area)
      db.collection('users').where({
        area: that.data.initial[length-1].area,
        type:'host'
      }).get()
      .then(r=>{
        that.setData({ 
          list:r.data
        })
        console.log(this.data.list)
        // console.log(that.data.list.length)
        // console.log(this.data.user.math)
      })
    })
    
    // users.get()
    // .then(r=>{
    //   that.setData({ 
    //     list:r.data
    //   })
    //   console.log(that.data.list)
    // })
    
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
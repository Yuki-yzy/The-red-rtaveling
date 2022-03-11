// pages/login/index.js
import Toast from '@vant/weapp/toast/toast';
import {areaList } from '../login/area';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList,
    user:{
      type: "host", //host,guest房东房客
      name:"",
      gender:"",
      describe:"",
      reason:"",
      time: new Date(),
      userInfo:"",
      judge:"",
      area:""
    }
  },
  showPopup() {
    if(this.data.user.area === '') {
      this.setData({ show: true });
    } else {
      this.setData({ show: false });
    }
  },
  clear() {
    this.setData({
      ['user.area']:''
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  area(e) {
    // console.log(e.detail.values)
    let areaAll = ''
    for(let i = 0;i <3;i++) {
      areaAll += e.detail.values[i].name 
    }
    // console.log(areaAll)
    this.setData({
      show: false,
      ['user.area']:areaAll
    })
  },
  nameChange(e) {
    this.setData({
      ['user.name']:e.detail
    })
  },
  genderChange(e) {
    if(e.detail.value === 'male') {
      var gender = '男'
    } else {
      var gender = '女'
    }
    // console.log(gender)
    this.setData({
      ['user.gender']:gender
    })
    // console.log(this.data.user.gender)
  },
  addressChange(e) {
    this.setData({
      ['user.address']:e.detail
    })
  },
  // timeChange() {
  //   let date = getDate()
  //   console.log(date)
  //   this.setData({
  //     ['user.time']:date
  //   })
  // },
  judge() {
    // console.log(this.data.user)
    if(this.data.user.name === '' || this.data.user.gender === ''|| this.data.user.area === '') {
      this.setData({
        ['user.judge']:1
      })
    } else {
      this.setData({
        ['user.judge']:0
      })
    }
  },
  submit(e) {
    this.judge()
    // console.log(this.data.user.judge)
    if(this.data.user.judge === 0) {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // console.log(res)
          this.setData({
            ['user.userInfo']: res.userInfo.avatarUrl,
            hasUserInfo: true,
            ['user.type']:'guest'
          })
          let that = this
          const db = wx.cloud.database()
          const users = db.collection('users')
          users.add({
            // data 字段表示需新增的 JSON 数据
            data: this.data.user
          })
              .then(res => {
                // console.log(that.data.user.userInfo)
                Toast.success('提交成功')
                // console.log(res.data[0])
                setTimeout(() => {
                  wx.navigateTo({
                    url: '/pages/gather/index',
                  })
                }, 2000);
              })
        }
      })
    } else {
      Toast.fail('不能为空')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    // users.get()
    // .then(r=>{
    //   console.log(r)
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
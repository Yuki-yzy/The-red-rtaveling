// pages/login/index.js
import Toast from '@vant/weapp/toast/toast';
import {areaList } from './area';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList,
    show:false,
    showUpload:true,
    user:{
      type: "host", //host,guest房东房客
      name:"",
      gender:"",
      describe:"",
      reason:"",
      time: new Date(),
      userInfo:"",
      judge:"",
      area:"",
      hotal:"",
      imgUrl:"",
      money:"",
      math:""
    }
  },
  upload(){
    //把this赋值给that，就相当于that的作用域是全局的。
    let that = this;
    // console.log("jaj");
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // console.log("成功",res);
        that.uploadImage(res.tempFilePaths[0]);
        that.setData({
          showUpload:false
        })
        console.log(that.data.showUpload)
        Toast.fail('上传成功')
      }
    })
  },
  uploadImage(fileURL) {
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime()+'.png', // 上传至云端的路径
      filePath: fileURL, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        // console.log("上传成功",res)
        //获取文件路径
        this.setData({
          ['user.imgUrl']:res.fileID
        })
        console.log(res.fileID)
      },
      fail: console.error
    })
    // console.log(this.data.user.imgUrl)
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
    console.log(areaAll)
    this.setData({
      show: false,
      ['user.area']:areaAll
    })
  },
  judgeNumber(e) {
    if(!(/(^[0-9]*$)/.test(e.detail.value))) {
      Toast.fail('请输入正确的价格格式')
    } else {
      this.setData({
        ['user.money']:e.detail.value
      })
    }
  },
  hotalChange(e) {
    this.setData({
      ['user.hotal']:e.detail
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
  describeChange(e) {
    this.setData({
      ['user.describe']:e.detail
    })
  },
  reasonChange(e) {
    this.setData({
      ['user.reason']:e.detail
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
    console.log(this.data.user)
    if(this.data.user.name === '' || this.data.user.gender === ''|| this.data.user.describe === '' || this.data.user.reason === '' || this.data.user.area === '' || this.data.user.hotal === '' || this.data.user.money === '' || this.data.user.imgUrl === '') {
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
      let random = (Math.random()*5).toFixed(1)
      this.setData({
        ['user.math']:random
      })
      console.log(this.data.user.math)
    this.judge()
    // console.log(this.data.user.judge)
    if(this.data.user.judge === 0) {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // console.log(res)
          this.setData({
            ['user.userInfo']: res.userInfo.avatarUrl,
            hasUserInfo: true
          })
          let that = this
          const db = wx.cloud.database()
          const users = db.collection('users')
          users.add({
            // data 字段表示需新增的 JSON 数据
            data: this.data.user
          })
              .then(res => {
                // console.log(this.data.user.address)
                // console.log(that.data.user.userInfo)
                console.log(this.data.user.imgUrl)
                Toast('提交成功待审核')
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
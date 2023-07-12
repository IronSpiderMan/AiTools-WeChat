// pages/steganography/steganography.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
      imageUrl: "http://127.0.0.1:8000/static/images/lbxx.png",
      qrUrl: "http://127.0.0.1:8000/static/steganography/qrcode/lbxx.png"
  },
  chooseImage: function(){
    let that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        //回显图片
        that.setData({
          imageUrl: res.tempFiles[0].tempFilePath
        })
        //上传图片
        wx.uploadFile({
          filePath: res.tempFiles[0].tempFilePath,
          name: "file",
          // url: 'http://39.100.68.34:8000/api/segment',
          url: 'http://127.0.0.1:8000/api/upload_image',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function(res){
            wx.showToast({
              title: '上传成功',
              icon: "success",
              duration: 3000
            })
            console.log(res.data);
            let jdata = JSON.parse(res.data);
            //回显图片
            that.setData({
              imageUrl: jdata.url
            })
          },
          fail: function(error){
            console.log(error)
            wx.showToast({
              title: '上传失败',
              icon: "error",
              duration: 3000
            })
          }
        })
      }
    })
  },
  inputContent: function(e){
    this.setData({
      content: e.detail.value
    })
  },
  steganography: function(){
    let that = this;
    if (this.data.content === undefined || this.data.content === null) {
      wx.showToast({
        title: '请输入要隐写的内容',
        icon: 'error'
      })
      return
    }
    wx.request({
      url: 'http://127.0.0.1:8000/api/steganography',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        image_url: that.data.imageUrl,
        content: that.data.content
      },
      success: function(res){
        wx.showToast({
          title: '隐写成功',
          icon: 'success'
        })
        that.setData({
          imageUrl: res.data.url
        })
        console.log(res.data);
      },
      fail: function(e){
        console.log(e)
      }
    })
  },
  anti_steganography: function(){
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/api/anti_steganography',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        image_url: that.data.imageUrl,
      },
      success: function(res){
        that.setData({
          qrUrl: res.data.url
        })
        console.log(res.data);
      },
      fail: function(e){
        console.log(e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
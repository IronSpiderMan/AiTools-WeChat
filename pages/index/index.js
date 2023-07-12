// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    features: {
      "segment": "/pages/segment/segment",
      "steganography": "/pages/steganography/steganography",
    }
  },
  // 事件处理函数
  chooseFeature(e){
    //跳转到上传图片的页面
    wx.navigateTo({
      url: this.data['features'][e.currentTarget.id],
    })
    console.log(e.target.id);
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
})
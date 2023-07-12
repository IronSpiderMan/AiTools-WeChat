// pages/segment/segment.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // imageUrl: "http://39.100.68.34:8000/static/images/zack.jpg",
    imageUrl: "http://127.0.0.1:8000/static/images/lbxx.png",
    defalut_color: "white",
    colors: [
      {id: 0, choosed: true, color: "white"},
      {id: 1, choosed: false, color: "red"},
      {id: 2, choosed: false, color: "deepskyblue"},
    ]
  },
  // onLoad:function(){
  //   wx.createSelectorQuery()
  //     .select("#segment-canvas")
  //     .fields({
  //       node: true,
  //     })
  //     .exec(this.init.bind(this))
  // },
  // init(res) {
  //   const canvas = res[0].node
  //   const ctx = canvas.getContext('2d')
  //   ctx.drawImage("http://39.100.68.34:5000/static/images/zack.jpg", 0, 0, 716, 882);
  //   ctx.draw()
  //   // canvas绘制图片
  //   // https://www.jianshu.com/p/ef8b958e9b9e
  // },
  chooseColor: function(e){
    let idx = e.currentTarget.dataset.index
    for(let i = 0; i < this.data.colors.length; i++){
      if(this.data.colors[i].id == idx){
        this.data.colors[i].choosed = true;
      }else{
        this.data.colors[i].choosed = false;
      }
    }
    this.setData({
      defalut_color: this.data.colors[idx].color,
      colors: this.data.colors
    })
    console.log(this.data)
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
          url: 'http://127.0.0.1:8000/api/segment',
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
})
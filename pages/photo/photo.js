const vars = getApp();



Page({

  data: {
    hasPhoto:false,
    bigimgSwitch: true,
    imgSrc:'',

  },  

  bindUpPhoto:function(){
    //提交数据
    //提醒用户
    wx.showModal({
      title: '提示',
      content: '确认无误并提交',
      confirmColor: '#2a8cff',
      success(res){
        if(res.confirm){
          vars.globalData.takePhotoStatus = true;
          wx.redirectTo({
            url: '../../pages/info/info'
          });
        }
      }
    })
  },
  //获取照片
  bindtakePhotoFunc: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          hasPhoto:true,
          imgSrc:res.tempFilePaths
          
        })
      }
    });
  },
  bindEnlargePhotoFunc:function(){
    var url = this.data.imgSrc[0]
    wx.previewImage({
      urls: [url],
    })

  },

  bindShowMask: function () {
    this.setData({ bigimgSwitch: false })
  },
  bindCloseMask: function () {
    this.setData({ bigimgSwitch: true })
  },

  onLoad: function (options) {

  },


 
})
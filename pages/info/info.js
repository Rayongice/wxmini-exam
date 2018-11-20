const vars = getApp();


Page({

  data: {
    // myInfro: [],
    // money: [],
    // hasData: true,
    // isHidden: true,
    // hide: "hide",
    // noHid: "noHid"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      allOkStatus:this.checkAllOkFunc(),
      takePhotoStatus: vars.globalData.takePhotoStatus,
      uploadStatus: vars.globalData.uploadStatus,
      paymentStatus: vars.globalData.paymentStatus,
      signatureStatus: vars.globalData.signatureStatus,
    })
  },
  checkAllOkFunc:function(){
    let data = vars.globalData;
    if (data.takePhotoStatus == true && data.uploadStatus == true && data.paymentStatus == true && data.signatureStatus == true){
      return true;
    }else{
      return false;
    }

  },
  bindToPhoto:function(){
    wx.navigateTo({
      url:'../../pages/photo/photo'
    })
  },
  bindToUpload:function(){
    wx.navigateTo({
      url:'../../pages/upload/upload'
    })
  },
  bindToPayment:function(){
    wx.navigateTo({
      url:'../../pages/payment/payment'
    })
  },
  bindToSignature:function(){
    wx.navigateTo({
      url:'../../pages/infoTable/infoTable'
    })
  }


})
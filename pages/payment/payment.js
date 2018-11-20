const vars = getApp();

Page({
  data: {
    payment_state:true,
    locData:[]

  },
  bindToClip(){
    console.log("点击了")
    wx.setClipboardData({
      data: '缴费网址',
      success:this.bindGetClipboardData.bind(this)
    })
  },
  bindGetClipboardData:function(res){
    wx.getClipboardData({
      success(result){
        console.log(result.data);
      }
    })
  },
  bindPaymentOk:function(option){
    //请求服务器查询结果
    vars.globalData.paymentStatus = true;
    if(this.data.payment_state){
      wx.redirectTo({
        url:'../../pages/paymentOk/paymentOk'
      })
    }
  },
  onLoad:function(){
  },
  bindWxLogin:function(){
    wx.login({
      success:function(res){
        //调用wx.login获取code码
        var code = res.code
        //请求开发者服务器
        wx.request({
          url: 'http://localhost:61819/wxLogin/ProcessLogin.ashx?code=' + code,
          method:'POST',
          success:(resp) => {
            console.log(resp)
          }
        })
      }
    })
  }


})
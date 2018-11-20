Page({

  data: {
    // preNumber:"",
    // stuName:'张三',
    // stuID:'110110197608081234',
    testNumber:'',
    testName:'',
    testID:'',

  },
  bindPreNumber:function(res){

    var testNumber = res.detail.value;
    this.setData({
      testNumber:testNumber
    })
  },
  bindStuName:function(res){
    var testName = res.detail.value;
    this.setData({
      testName:testName
    })
  },
  bindStuID:function(res){
    var testID = res.detail.value;
    this.setData({
      testID:testID
    })
  },
  bindCheckInput:function(){
    // var data = this.data;
    // if (data.testNumber === '110110' && data.testName === '张三' && data.testID === '110110197608081234'){
    //   wx.navigateTo({
    //     url:'../../pages/info/info',
    //   })
    // }
    wx.redirectTo({
      url: '../../pages/info/info'
    })
  },
  bindNavAlbFunc:function(){
    wx.navigateTo({
      url:'../../pages/album/album'
    })
  }

  
})
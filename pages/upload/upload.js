const vars = getApp();
Page({
  data: {
    currentTab: 0,
    src: '',
    inputText:'',
  },
  onLoad: function() {
    var that = this
    this.ctx = wx.createCameraContext();
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      },
    })
  },
  //示例展示区导航
  bindToShowExamples: function() {
    wx.navigateTo({
      url: '../../pages/showExamples/showExamples'
    })
  },

  //滑动切换内容
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  choice: function() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        var tempFilePaths = res.tempFilePaths
        that.setData({
          src: tempFilePaths,
        })
      }
    })
  },
  bindOkUpInfo: function() {
    //提交数据
    //提醒用户
    wx.showModal({
      title: '提示',
      content: '确认提交,并返回首页',
      confirmColor: '#2a8cff',
      success(res) {
        if (res.confirm) {
          vars.globalData.uploadStatus = true;
          wx.redirectTo({
            url: '../../pages/info/info'
          });
        }
      }
    })
  },

  bindNoUpInfo: function() {
    //提交数据
    //提醒用户
    wx.showModal({
      title: '提示',
      content: '确认提交,并返回首页',
      confirmColor: '#2a8cff',
      success(res) {
        if (res.confirm) {
          vars.globalData.uploadStatus = true;
          wx.redirectTo({
            url: '../../pages/info/info'
          });
        }
      }
    })
  },

  //用户输入“工作单位”和“曾用名”
  bindInputConfirFunc:function(e){
    this.setData({
      inputText:e.detail.value
    })
  },
   //用户点击清空图标
   bindClearContentFunc:function(){
     this.setData({
       inputText:''
     })
   }


})
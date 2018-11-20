Page({

  data: {
    images: [],
    imgsAmount: '0',
    selectStatus: false,
    showModalStatus: false,
    fromIndexData: '',
    userInputData: '',
  },
  onLoad: function(options) {},
  //选择图片
  bindChooseImgFunc: function() {
    wx.chooseImage({
      sizeType: ['compresed'],
      sourceType: ['album', 'camera'],
      success: this.addImgSucFun.bind(this)
    });
  },
  //添加图片
  addImgSucFun: function(res) {
    let tempFilePaths = res.tempFilePaths;
    let images = this.data.images.concat(tempFilePaths)
    let imgsAmount = images.length
    this.setData({
      images: images,
      imgsAmount: imgsAmount,
      selectStatus: true
    });
  },

  //放大图片
  bindEnlargeImgFunc: function(e) {
    let urls = [];
    urls.push(e.currentTarget.dataset.src)
    wx.previewImage({
      urls: urls
    })
  },
  //删除图片
  bindDelFunc: function(e) {
    wx: wx.showModal({
      title: '删除图片',
      content: '你确定删除吗？',
      confirmColor: '#2a8cff',
      success: (res) => {
        let index = e.currentTarget.dataset.index;
        let that = this;
        if (res.confirm) {
          let images = this.data.images;
          images.splice(index, 1);
          let imgsAmount = that.data.imgsAmount - 1;
          that.setData({
            images: images,
            imgsAmount: imgsAmount,
            selectStatus: imgsAmount <= 0 ? false : true
          })
        }
      }
    })
  },
  //获取第一个值
  bindGetFirstNum: function(e) {
    let length = this.data.images.length;
    let that = this;
    if (e.detail.value > length) {
      wx.showModal({
        title: '图片不存在',
        content: '请重新填写',
        confirmColor: '#2a8cff',
        success: (res) => {
          if (res.confirm) {
            that.setData({
              firstNum: ''
            })
          }
        }
      })
    } else {
      that.setData({
        firstNum: e.detail.value
      })
    }
  },
  //获取第二个值
  bindGetSecNum: function(e) {
    let length = this.data.images.length;
    let that = this;
    if (e.detail.value > length) {
      wx.showModal({
        title: '图片不存在',
        content: '请重新填写',
        confirmColor: '#2a8cff',
        success: (res) => {
          if (res.confirm) {
            that.setData({
              secNum: ''
            })
          }
        }
      })
    } else {
      that.setData({
        secNum: e.detail.value
      })
    }
  },


  //上传图片
  bindUploadPhoto: function() {
    let data = this.data.images;
    wx.showModal({
      title: '上传图片',
      content: '共上传' + data.length + '张',
      confirmColor: '#2a8cff',
      success: (res) => {
        if (res.confirm) {
          this.uploadImgsToServer(data)
        }
      }

    })

  },
  //上传图片
  uploadImgsToServer: function(data) {

    for (let i = 0; i < data.length; i++) {
      wx.uploadFile({
        url: '',
        filePath: data[i],
        name: 'imgs',
        success: (res) => {
          //根据返回状态码，提示用户
          console.log(res);
        }
      })
    }
  },

  //返回首页
  bindNavtoIndex(imgsAmount) {
    wx.showModal({
      title: '返回首页',
      content: '确定上传完成?',
      confirmColor: '#2a8cff',
      success: (res) => {
        if (res.confirm) {
          this.navToIndex();
        }
      }
    })

  },
  //返回首页
  navToIndex: function() {
    wx: wx.redirectTo({
      url: '../../pages/index/index',
    })
  },
  //显示弹窗
  bindShowDialog: function(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      showModalStatus: true,
      fromIndexData: e.currentTarget.dataset.index
    })
  },
  //隐藏弹窗
  bindHideModal: function() {
    this.setData({
      showModalStatus: false
    })
  },
  //获取用户输入图片序号
  bindUserInput: function(e) {
    let that = this;
    let length = this.data.images.length;
    let fromIndexData = this.data.fromIndexData;
    let indexData = e.detail.value;
    if (indexData > length) {
      wx.showModal({
        title: '图片不存在',
        content: '请重新填写',
        confirmColor: '#2a8cff',
        success: (res) => {
          if (res.confirm) {
            that.setData({
              userInputData: ''
            })
          }
        }
      })
    } else if (indexData == fromIndexData+1) {
      wx.showModal({
        title: '序号相等',
        content: '请重新填写',
        confirmColor: '#2a8cff',
        success: (res) => {
          if (res.confirm) {
            that.setData({
              userInputData: ''
            })
          }
        }
      })
    } else {
      this.setData({
        userInputData: e.detail.value
      })
    }
  },
  //交换图片
  bindChangeIndex: function() {
    if(this.data.userInputData == "")
    {
      wx.showModal({
        title: '提示',
        content: '更改序号不能为空',
        confirmColor: '#2a8cff',
      })
    }else{
      let fromIndexData = this.data.fromIndexData;
      let userInputData = this.data.userInputData - 1;
      let pics = this.data.images;
      let tempData = pics[userInputData];

      pics[userInputData] = pics[fromIndexData];
      pics[fromIndexData] = tempData;
      this.setData({
        images: pics,
        showModalStatus: false
      });

    }

  }

})
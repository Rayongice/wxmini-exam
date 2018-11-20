var vars = getApp();

var content = null;
var touchs = [];

Page({
  data: {
    imgList:[],
    signImage:''
  },

  //画布移动触摸开始时响应
  start:function(e){
    // console.log("触摸开始" + e);
    let point = {x:e.changedTouches[0].x, y:e.changedTouches[0].y};
    touchs.push(point);
  },
  //画布的触摸移动手势响应
  move:function(e){
    let point ={x:e.touches[0].x, y:e.touches[0].y};
    touchs.push(point);
    if(touchs.length >= 2){
      this.draw(touchs);
    }
  },
  //画布的触摸移动结束手势响应
  end:function(e){
    // console.log("触摸结束" + e);
    for(let i = 0; i < touchs.length; i++){
      touchs.pop();
    }
  },
  //画的触摸取消响应
  cancel:function(e){
    // console.log("触摸取消"+e);
  },
  //画布的长按手势响应
  tap:function(e){
    console.log("长按手势" + e);
  },
  //触摸错误
  error:function(e){
    console.log("画布触摸错误" + e);
  },
  onLoad:function(options){
    //活的Canvas的上下文
    content = wx.createCanvasContext('canvas');
    //设置线的颜色
    content.setStrokeStyle("#000");
    //设置线的宽度
    content.setLineWidth(3);
    //设置线两段端点样式的圆润
    content.setLineCap('round');
    //设置两条线连接处更加圆润
    content.setLineJoin('round');
  },

  //绘制
  draw:function(touchs){
    let point1 = touchs[0];
    let point2 = touchs[1];
    touchs.shift();
    content.moveTo(point1.x, point1.y);
    content.lineTo(point2.x, point2.y);
    content.stroke();
    content.draw(true);
  },
  //清除操作
  bindClear:function(){
    content.clearRect(0, 0, 750, 700);
    content.draw(true);
  },
  //保存图片
  uploadSignature:function(){
    var that = this;
    wx.canvasToTempFilePath({
      canvasId:'canvas',
      success:function(res){
        //打印图片路径
        console.log(res.tempFilePath);
        //设置状态跳转到成功页面
        wx.showModal({
          title: '提示',
          content: '确认提交',
          confirmColor: '#2a8cff',
          success(res) {
            if (res.confirm) {
              vars.globalData.signatureStatus = true;
              wx.redirectTo({
                url: '../../pages/signatureOk/signatureOk'
              });
            }
          }
        })
        
        that.setData({
          signImage:res.tempFilePath
        })
      }
    })
  }

})
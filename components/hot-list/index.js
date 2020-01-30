// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner: Object,
  },


  observers:{
    'banner':function (banner){
      if(!banner){
        return
      }
      if(banner.items.length === 0){
        return
      }
      const left = banner.items.find(t=>t.name==='left')
      const rightTop = banner.items.find(t=>t.name==='right-top')
      const rightBottom = banner.items.find(t=>t.name==='right-bottom')
      this.setData({
        left,
        rightTop,
        rightBottom
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    left:Object,
    rightTop:Object,
    rightBottom:Object

    // 生命周期函数 处理数据 ready() attached()
    // 监听器处理数据


  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

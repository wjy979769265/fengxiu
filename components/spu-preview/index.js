// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      data:Object,
      
  },
  

  observers:{
    data:function (data){     //监听器处理分割标签tags
      if(!data){
        return
      }
      if(!data.tags){
        return
      }
      const tags = data.tags.split('$')

      this.setData(
        {
          tags
        }
      )
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    tags:Array
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImgLoad(event){
      const{width, height} = event.detail 
      // console.log(width,height)
      this.setData({
        w:340,
        h:340*height/width
      })
    },
    onItemTap(event){          //处理点击事件的函数
      const pid =event.currentTarget.dataset.pid   //获得对应data-pid
      wx.navigateTo({
        url:`/pages/detail/detail?pid=${pid}`      //把pid放在options 里面
      })
    },
  },
    
  


})

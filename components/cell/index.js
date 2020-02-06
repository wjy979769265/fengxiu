// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell:Object,
    x:Number,
    y:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(evenet){
      this.triggerEvent('celltap',{       //触发点击事件 子组件向父组件传参 用方法
          //点击的时候，从下到上，触发传过来叫celltap的函数 传递cell参数
          cell:this.properties.cell,
          x:this.properties.x,
          y:this.properties.y
      },{
        bubbles:true,
        composed:true
      })
    }
  }
})

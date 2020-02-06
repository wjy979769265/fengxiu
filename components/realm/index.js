import { FenceGroup } from "../models/fence-group"
import { Judger } from "../models/judger";


// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
      judger:Object,
  },

  lifetimes:{
    attached() {

    },
    // ready(){

    // },
    // create() {

    // }
  },
  observers:{
    //spu改变的时候触发这个监听函数
    'spu': function(spu) {     //这里函数的命名为什么有的加引号有的不加， 都一样的吗？
      if(!spu){
        return
      }
      const fenceGroup = new FenceGroup(spu)
      // fenceGroup.initFences()
      fenceGroup.initFences_by_transpose()
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
      this.bindInitData(fenceGroup)
    }
  },



  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData(fenceGroup){
      this.setData({
        fences:fenceGroup.fences
      })

    },
    onCellTap(event){
      console.log(event.detail);
      const cell = event.detail.cell
      const judger = this.data.judger
      judger.judge(cell)
      this.setData(
          {fences:judger.fenceGroup.fences})
    }

  }
})

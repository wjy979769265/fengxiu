
import { Cell } from "./cell"




class Fence{

    cells = []
    specs
    title
    id
    constructor(specs){
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }
    initiate(){     
        this.initCells()
    }

    initCells(){
        this.specs.forEach(s=>{    //specs也是矩阵格式吗 为什么可以调用forEach
            //因为forEach是内置函数！
            // this.pushValueTitle(s.value)
            const cell = new Cell(s)

            // some and every都会遍历数组
            // some 有一个元素满足，返回ture， every所有元素满足，返回true
            const existed = this.cells.some(c=>{
                return c.id === s.value_id
            })
            if(existed){
                return
            }
            this.cells.push(cell)
        })
        
    }
 


    // pushValueTitle(title){
    //     this.valueitles.push(title)
    // }

}


export {
    Fence
}
import { Matrix } from "./matrix"
import { Fence } from "./fence"



class FenceGroup{



    spu
    skuList = []
    fences

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    eachCell(cb){
        for(let i = 0; i<this.fences.length; i++){
            for(let j=0;j<this.fences[i].cells.length; j++){
                const cell = this.fences[i].cells[j]
                cb(cell,i,j)
            }
        }
    }


    getDefaultSku(){
        const defaultSkuId = this.spu.default_sku_id
        if(!defaultSkuId){
            return
        }
        return this.skuList.find(s=>{
            s.id===defaultSkuId
        })
    }


    initFences() {    //做遍历，不具有整体性
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        let currentJ = -1;
        matrix.forEach((element,i,j)=>{   //对每一个element 执行这个函数
            //生成三个fence
            if(currentJ !== j){
                //开启新列，创建新的fence
                currentJ = j
                fences[currentJ] = this._createFence()
            }
            fences[currentJ].pushValueTitle(element.value)
        })
    }

    initFences_by_transpose() {   //更好的方法
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        console.log(matrix)

        // var a = []
        // a[0] = [1,2,3]
        // a[1] = [4,5,6]
        // a.forEach(r=>{
        //     console.log(r)
        // })

        const AT = matrix.transpose()
        console.log(AT)
        AT.forEach(r=>{
            console.log("r")  
            console.log(r)
            const fence = new Fence(r)     //有构造函数
            fence.initiate()
            fences.push(fence)
        })
        this.fences = fences
        console.log(fences)
        
    }

    _createFence(){ 
        const fence = new Fence()    //无构造函数
        return fence
    }

    _createMatrix(skuList){
        const m = []
        skuList.forEach(element => {
            m.push(element.specs)     //js用的是push和pop？
        });     
        return new Matrix(m)   
        //为什么返回一个类？
        // 不仅仅要数据，还要操作方法(transpose)
    }

}


export {
    FenceGroup
}
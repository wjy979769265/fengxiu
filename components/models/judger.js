import {skuCode} from "./sku-code";


class Judger{

    fenceGroup
    pathDict = []

    constructor(fenceGroup){
        this.fenceGroup = fenceGroup
        this.initPathDir()
    }

    initPathDir(){
        this.fenceGroup.spu.sku_list.forEach(s=>{
            const skuCOde = new skuCode(s.code)
        })
    }
}



export{
    Judger
}
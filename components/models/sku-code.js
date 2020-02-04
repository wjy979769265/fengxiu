

import {combination} from "../../utils/util";
import {Paging} from "../../utils/paging";

class skuCode{    //所有可能对应的skucode
    spuId
    segments = []
    constructor(code){
        this.code = code
        this.splitToSegments()
    }

    splitToSegments(){
        // split sku 的代码
        const spuAndSpec = this.code.split('$')
        this.spuId = spuAndSpec[0]        //spu对应的id

        const specCodeArray = spuAndSpec[1].split('#')
        const length = specCodeArray.length

        for(let i = 1; i <= length; i++){
            const segments = combination(specCodeArray,i)
            const newSegments = segments.map(segs=>{
                console.log('segs')
                console.log(segs.join('#'))
                return segs.join('#')
            })
            console.log('segments'+i)
            console.log(segments)
        }

    }

}

export{
    skuCode
}
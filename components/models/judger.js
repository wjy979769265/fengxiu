import {SkuCode} from "./sku-code";
import {CellStatus} from "../core/enum";


class Judger {

    fenceGroup
    pathDict = []

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDir()
    }

    _initPathDir() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
    }

    judge(cell){
        this._changeCellStatus(cell)
    }

    _changeCellStatus(cell) {
        if(cell.status === CellStatus.WATTING){
            cell.status = CellStatus.SELECTED
        }
        if(cell.status === CellStatus.SELECTED){
            cell.status = CellStatus.WATTING
        }

    }


}


export {
    Judger
}
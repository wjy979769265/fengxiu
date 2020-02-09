import {SkuCode} from "./sku-code";
import {CellStatus} from "../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";


class Judger {

    fenceGroup
    pathDict = []
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDir()
        this._initSkuPendng()
    }

    _initSkuPendng() {
        this.skuPending = new SkuPending()
        const defaultSku = this.fenceGroup.getDefaultSku()
        if(!defaultSku){
            return
        }
        // this.skuPending = new SkuPending()

    }

    _initPathDir() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        console.log('path dict')
        console.log(this.pathDict)
    }

    judge(cell, x, y) {
        console.log('刚点击完'+cell+'现在开始设置路径')
        this._changeCurrentCellStatus(cell, x, y)
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPaths(cell, x, y)
            // console.log('path')

            if (!path) {
                console.log('对这个cell来说！')
                console.log(cell)
                console.log('path是空！')
                return
            }
            const isIn = this._isInDict(path)
            console.log(path)
            console.log('这个path在字典里吗？isIn')
            console.log(isIn)
            if (isIn) {
                this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
                console.log('设置了' + x +'行' + y + '列为WATTING')
            } else {
                this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
                console.log('设置了' + x +'行' + y + '列为FORBIDDEN')
            }
        })
    }

    _findPotentialPaths(cell, x, y) {
        console.log('现在在为'+cell+'findPotenPaths')
        const joiner = new Joiner('#')
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i)
            if (x === i) {
                //当前行的所有cell
                if (this.skuPending.isSelected(cell, x)) { //是被选中的他自己
                    console.log('对这个cell来说！')
                    console.log(cell)
                    console.log('当前行已选中 在sku-pedning中 return')
                    return
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
                // console.log('当前行')
                // console.log(i)
                // console.log(joiner.getStr())
            } else {
                //其它行的cell
                if (selected) {
                    //当前的sku码
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
                // console.log('其它行')
                // console.log(i)
                // console.log(joiner.getStr())
            }
        }
        return joiner.getStr()
    }


    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    _isInDict(path) {
        return this.pathDict.includes(path)
    }


    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            // console.log(x)
            // console.log(y)
            // console.log(this.fenceGroup.fences)
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
            console.log('添加cell到pending')
            console.log(cell)
            this.skuPending.insertCell(cell, x)
            // cell.status = CellStatus.SELECTED
        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            this.skuPending.removeCell(x)
        }

    }


}


export {
    Judger
}
















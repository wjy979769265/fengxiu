



class SkuPending{


    pending =[]
    constructor() {

    }



    insertCell(cell,x){
        this.pending[x] = cell
    }

    removeCell(x){
        this.pending[x] = null
    }

    findSelectedCellByX(x){
        return this.pending[x]
    }

    isSelected(cell,x){
        const pendingCell = this.pending[x]
        if(!pendingCell){
            return false
        }
        console.log('打印当前pending')
        for( let k = 0; k < this.pending.length; k++){
            console.log(this.pending[k])
        }

        console.log('当前cell')
        console.log(cell)
        console.log('cell.id === pendingCell.id ?')
        console.log(cell.id === pendingCell.id)
        return cell.id === pendingCell.id
    }


}


export {
    SkuPending
}
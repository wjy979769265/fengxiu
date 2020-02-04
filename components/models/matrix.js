



class Matrix {
    m
    constructor(matrix) {
        this.m = matrix
    }

    get rowsNum() {
        return this.m.length
    }
    get ColumnNum() {
        return this.m[0].length
    }

    forEach(cb) {
        for (let j = 0; j < this.ColumnNum; j++) {
            for (let i = 0; j < this.rowsNum; i++) {
                const element = this.m[i][j]    //对原始对matrix 做的遍历
                // console.log("elementsssssssss")
                cb(element, i, j)    //回调函数
            }
        }
    }

    transpose() {
        const desArr = []
        for (let j = 0; j < this.ColumnNum; j++) {
            desArr[j] = []
            for (let i = 0; i < this.rowsNum; i++) {
                // console.log("this.m[i][j]")
                // console.log(this.m[i][j])
                desArr[j][i] = this.m[i][j]
            }
        }
        return desArr
    }

    


}


export {
    Matrix
}
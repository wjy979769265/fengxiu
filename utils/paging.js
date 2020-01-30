import { Http } from "./http"
//没有很理解paging的逻辑？

class Paging {
    // dont care about details, just give data 

    req
    start
    count
    locker = false
    url
    moreData = true
    accumulator = []

    constructor(req, count = 10, start = 0) {
        this.count = count
        this.start = start
        this.req = req
        this.url = req.url
    }

    async getMoreData() {
        //generator, be called by other to get more data

        if (!this.moreData) {
            console.log(this.moreData)
            console.log('no more data!!')
            return
        }
        console.log('the locker1 now is ')
        console.log(this.locker)
        if (this._getLocker()) {
            console.log('locking!!!')
            return
        }


        const data = await this._actualGetData()
        this._releaseLocker()
        console.log('the locker2 now is ')
        console.log(this.locker)
        return data
    }

    async _actualGetData() {
        const req = this._getCurrentReq()
        let paging = await Http.request(req)

        if (!paging) {
            return null
        }
        if (paging.total === 0) {   //total parameter from web server
            return {
                empty: true,
                items: [],
                moreData: false,  
                accumulator: []
            }

        }

        this.moreData = Paging._moreData(paging.total_page, paging.page)
//totalPage and pageNum 也是来自服务器的参数吗？
        if (this.moreData) {
            this.start += this.count
        }
        this._accumulator(paging.items)
        console.log('right now the more data is')
        console.log(this.moreData)
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,  //是不是最后一页
            accumulator: this.accumulator
        }
    }

    _accumulator(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    static _moreData(total_page, page) {
        return page < total_page - 1
    }

    _getCurrentReq() {
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        // url = v1/spu/latest + '?' + params
        if (url.includes('?')) {
            url += '&' + params
        } else {
            url += '?' + params
        }
        this.req.url = url
        return this.req
    }

    _getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker() {
        this.locker = true
    }
}

export {
    Paging
}
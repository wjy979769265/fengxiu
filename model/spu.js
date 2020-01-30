import { Http } from "../utils/http";
import { Paging } from "../utils/paging";





class SpuPaging{
    static getLatestPaing(){
        return new Paging({
            url:`/v1/spu/latest`
        },5)
        // Http.request(``)
    }
}

export{
    SpuPaging
}



// 1. 分页细节全分析 一条数据都没有 最后一页，没有更多数据了 累加 1-20 21-40 ...... setData 重新渲染页面 非分页数据：a. 正在加载 b. 空 分页数据：：a. 正在加载 b. 加载完成 c. 没有更多数据 上滑页面触底 ，加载数据，要便面用户重新发请求 （redis、数据锁） 2. 防抖、截流 按钮：禁用、倒计时、模态loading
//为什么setData每次都要渲染全部数据？？
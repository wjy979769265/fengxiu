import { Http } from "../utils/http"








class Spu{
    static getDetail(id){
        return Http.request({
            url:`/v1/spu/id/${id}/detail`
        })
        // Http.request(``)
    }
}

export{
    Spu
}

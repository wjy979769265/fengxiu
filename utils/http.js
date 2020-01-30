import {config} from "../config/config";
import {promisic} from "./util";

export class Http {
    static async request({url, data, method = 'GET'}){
        const res = await promisic(wx.request)({
            url:config.apiBaseUrl+url,
            data,
            method,
            header: {
                appKey: config.appKey
            }
        })
        return res.data;
    }
}

// promisic(wx.request)({
//     url:'',s
//     data:data,
// })


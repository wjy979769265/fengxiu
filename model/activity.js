import { Http } from "../utils/http"





class Activity{
    static licationD = 'a-2'
    static async getHomeLocationD(){
        return await Http.request({
            url:`/v1/activity/name/${Activity.licationD}`
        })
    }

}
export{
    Activity
}
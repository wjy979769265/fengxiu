// pages/home/home.js
import { config } from "../../config/config";
import { Theme } from "../../model/theme";
import { Banner } from "../../model/banner";
import { Category } from "../../model/category";
import { Activity } from "../../model/activity";
import { SpuPaging } from "../../model/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        bannerB: null, 
        grid: [],
        activityD: null,
        themeE: null,
        themeESpu: null,
        themeF: null,
        bannerG: null,
        themeH:null,
        spuPaging:null,
        loadingType:'loading'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.initAllData()
        this.initBottomSpuRecommend()
    },


    async initBottomSpuRecommend(){
        const paging = SpuPaging.getLatestPaing()
        
        const data = await paging.getMoreData()
        this.data.spuPaging = paging
        if(!data){
            return
        }
        //automatic accumulation
        wx.lin.renderWaterFlow(data.items)    //? 不理解这个函数
        //抽象组件的思路：
        // 在home xml弄一个water flow组件，把自己自定义商品组件传进去
    },

    async initAllData() {
        const theme = new Theme()
        await theme.getThemes()
        const themeA = await theme.getHomeLocationA()
        const bannerB = await Banner.getHomeLocationB()
        const grid = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()
        const themeE = await theme.getHomeLocationE()
        const themeF = await theme.getHomeLocationF()
        const bannerG = await Banner.getHomeLocationG()
        const themeH = await theme.getHomeLocationH()


        let themeESpu = []
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            // console.log(data)
            // console.log(themeESpu)
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
                // console.log(themeESpu)
            }
        }
        this.setData({
            themeA: themeA,
            bannerB: bannerB,
            grid: grid,
            activityD: activityD,
            themeE,
            themeESpu: themeESpu,
            themeF,
            bannerG,
            themeH
        })
    },











    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        //加载更多对象
        const data = await this.data.spuPaging.getMoreData()
        console.log(data)
        if(!data){
            return
            console.log('no data!!')
        }
        wx.lin.renderWaterFlow(data.items)
        if(!data.moreData){
            this.setData({
                loadingType:'end'
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
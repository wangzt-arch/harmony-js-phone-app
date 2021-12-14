import hmsHttp, {baseUrl, userId, userSession, subsiteId} from '../../common/utils.js';

export default {
    data: {
        tabBars: ['全部', '礼品券', '停车券'],
    },
    onInit() {
        this.getCoupons()
    },
    onSelectType(idx, e) {
        console.log(idx)
        console.log(JSON.stringify(e))
        if (idx == 0) {

        }
    },
    async getCoupons() {
        const url = `${baseUrl}/MAGIC-COUPON/front/coupons/mine`
        const params = {
            extraData: {
                per_page: 10,
                page: 1,
                query_status: 'ENABLED',
                coupon_type:'',
                subsite_id: subsiteId,
            },
            header: {
                userId: userId,
                subsiteId: subsiteId,
                userSession: userSession
            }
        }
        try {
            const res = await  hmsHttp(url, params, "GET")
            const resString = JSON.stringify(res)
            const resObj = JSON.parse(res.result)
            console.log(resString)
        }
        catch (err) {
            console.info(err)
        }
    }
}

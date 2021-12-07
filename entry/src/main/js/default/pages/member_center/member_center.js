import hmsHttp from '../../common/utils.js';
import router from '@system.router';

export default {
    data: {
        nickname: '卖小客',
        avatar: '',
        couponCount: 0,
        pointAmount: 0,
        cardLevelName: ''
    },
    onInit() {
        this.onGetUserAssets(),
        this.onGetUserMessage()
    },
    onNavigateTo() {
        router.push({
            uri: 'pages/parking/parking'
        })
    },
    async onGetUserMessage() {
        try {
            const params = {
                extraData: {},
                header: {
                    userId: 72002,
                    userSession: "45c6075d01944580ae580a57c5af0fa3",
                    subsiteId: '4'
                }
            }
            const res = await hmsHttp("https://miao-magic-dev-restapi.co-mall.com/api/v2/profiles/mine", params, 'GET')
            console.log(JSON.stringify(res.result))
            console.log(res.responseCode)
            const result = JSON.parse(res.result)
            this.nickname = result.nick_name
            this.avatar = result.pic
            this.cardLevelName = result.card_level_name

        }
        catch (err) {
            console.info(err)
        }
    },
    async onGetUserAssets() {
        try {
            const params = {
                extraData: {},
                header: {
                    userId: 72002,
                    userSession: "45c6075d01944580ae580a57c5af0fa3",
                    subsiteId: '4'
                }
            }
            const res = await hmsHttp("https://miao-magic-dev-restapi.co-mall.com/MAGIC-MEMBER/front/members/mine/assets", params, 'GET')
            console.log(JSON.stringify(res.result))
            console.log(res.responseCode)
            const result = JSON.parse(res.result)
            this.pointAmount = result.point_amount
            this.couponCount = result.member_coupon_count

        }
        catch (err) {
            console.info(err)
        }
    }
}

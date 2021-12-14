import hmsHttp, {baseUrl, userId, userSession, subsiteId, separate_4_4_n_3} from '../../common/utils.js';
import router from '@system.router';

export default {
    data: {
        nickname: '卖小客',
        avatar: '',
        couponCount: 0,
        pointAmount: 0,
        cardLevelName: '普卡',
        maxExperience: 300,
        experience: 150,
        cardNo: '6275 9803 38918829 599',
        memberCardLevel: '',
        servers:['停车缴费','领券中心']
    },
    showCodeCard() {
        this.$element('code-card').show()
    },
    onShow() {
        this.onGetUserAssets(),
        this.onGetUserMessage(),
        this.onGetCard()
    },
    onNavigateTo(idx) {
        if (idx === 0) {
            router.push({
                uri: 'pages/parking/parking'
            })
        }
        if (idx === 1) {
            router.push({
                uri: 'pages/my_coupons/my_coupons'
            })
        }

    },
    async onGetUserMessage() {
        const url = `${baseUrl}/api/v2/profiles/mine`
        try {
            const params = {
                extraData: {},
                header: {
                    userId: userId,
                    userSession: userSession,
                    subsiteId: subsiteId
                }
            }
            const res = await hmsHttp(url, params, 'GET')
            console.log(JSON.stringify(res.result))
            console.log(res.responseCode)
            const result = JSON.parse(res.result)
            this.nickname = result.nick_name
            this.avatar = result.pic
            this.memberCardLevel = result.member_card.member_level_pic
            this.cardLevelName = result.card_level_name
            this.cardNo = separate_4_4_n_3(result.card_no)
        }
        catch (err) {
            console.info(err)
        }
    },
    async onGetUserAssets() {
        const url = `${baseUrl}/MAGIC-MEMBER/front/members/mine/assets`
        try {
            const params = {
                extraData: {},
                header: {
                    userId: userId,
                    userSession: userSession,
                    //                    userId: 70003,
                    //                    userSession: "0df085d175ee4e18bbae5c1203a8f191",
                    subsiteId: subsiteId
                }
            }
            const res = await hmsHttp(url, params, 'GET')
            console.log(JSON.stringify(res.result))
            console.log(res.responseCode)
            const result = JSON.parse(res.result)
            this.pointAmount = result.point_amount
            this.couponCount = result.member_coupon_count
        }
        catch (err) {
            console.info(err)
        }
    },
    async onGetCard() {
        const url = `${baseUrl}/MEMBER-CENTER/front/membership_cards/mine`
        try {
            const params = {
                extraData: {},
                header: {
                    userId: userId,
                    userSession: userSession,
                    subsiteId: subsiteId
                }
            }
            const res = await hmsHttp(url, params, 'GET')
            console.log(JSON.stringify(res.result))
            console.log(res.responseCode)
            const result = JSON.parse(res.result)
            this.experience = result[0].experience
            this.maxExperience = result[0].experience_upper_limit
        }
        catch (err) {
            console.info(err)
        }
    },
    onNavigateToProfile() {
        router.push({
            uri: 'pages/profile/profile'
        })
    },
    onNavigateToHome() {
        router.replace({
            uri: 'pages/home/home'
        })
    }
}

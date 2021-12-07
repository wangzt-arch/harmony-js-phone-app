import hmsHttp from '../../common/utils.js';
import router from '@system.router';

export default {
    data: {
        nickname: '卖小客'
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
            const hmsData = await hmsHttp("https://miao-magic-dev-restapi.co-mall.com/api/v2/profiles/mine", params, 'GET')
            console.info("个人信息", hmsData.result)
            console.info("个人信息", hmsData.header)
            console.info("个人信息1", JSON.stringify(hmsHttp))
            console.info("个人信息2", JSON.stringify(hmsHttp.result))
            console.log(hmsData.responseCode)

        }
        catch (err) {
            console.info(err)
        }
    }
}

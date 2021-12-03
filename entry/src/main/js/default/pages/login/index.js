import hmsHttp from '../../common/utils'
import router from '@system.router';

export default {
    data: {
        title: "",
        mobile: '',
        verifySms: ''
    },
    onInit() {
        this.title = this.$t('strings.world');
    },
    inputMobile(e) {
        this.mobile = e.value
    },
    inputSms(e) {
        this.verifySms = e.value
    },
    async getSmsData() {
        console.log(this.mobile)
        console.info(this.mobile)
        try {
            const params = {
                extraData: {
                    phone_number: this.mobile
                },
                header: {}
            }
            const hmsData = await hmsHttp("https://miao-magic-dev-restapi.co-mall.com/api/sms/noCaptcha/201", params, 'POST')
            console.info("验证码", hmsData)
        }
        catch (err) {
            console.info(err)
        }
    },
    async login() {
//        try {
//            const url = 'https://miao-magic-dev-restapi.co-mall.com/api/members/members_login_by_mobile'
//            const params = {
//                extraData: {
//                    phone_number: this.mobile,
//                    sms_verify_code: this.verifySms
//                },
//                header: {
//
//                }
//            }
//            const hmsData = await hmsHttp(url, params, 'POST')
//            const hmsString = JSON.stringify(hmsData)
//            console.info(hmsString)
//            console.info(JSON.stringify(hmsData.result))
//
//
//        }
//        catch (err) {
//            console.info(err)
//        }
        router.push({
            uri: 'pages/home/home'
        })
    }
}

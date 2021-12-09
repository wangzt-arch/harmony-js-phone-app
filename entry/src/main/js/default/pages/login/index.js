import hmsHttp, {baseUrl, subsiteId} from '../../common/utils'
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
            const res = await hmsHttp(`${baseUrl}/api/sms/noCaptcha/201`, params, 'POST')
            console.info("验证码", res)
        }
        catch (err) {
            console.info(err)
        }
    },
    async login() {
        //        router.push({
        //         uri: 'pages/home/home'
        //        })
        try {
            const url = `${baseUrl}/api/members/members_login_by_mobile`
            const params = {
                extraData: {
                    phone_number: this.mobile,
                    sms_verify_code: this.verifySms
                },
                header: {
                    subsiteId: subsiteId
                }
            }
            const res = await hmsHttp(url, params, "POST")
            const hmsString = JSON.stringify(res)
            console.log(hmsString)
            console.log(res)
            console.log(JSON.stringify(res.result))
        }
        catch (err) {
            console.info(err)
        }
    }
}

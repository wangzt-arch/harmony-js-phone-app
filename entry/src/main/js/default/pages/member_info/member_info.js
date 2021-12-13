import hmsHttp, {baseUrl, userId, userSession, subsiteId} from '../../common/utils.js';
import prompt from '@system.prompt';

export default {
    data: {
        disabled:'false',
        name: '',
        sex: '请选择',
        cardNumber: '',
        sexValue: ["保密", "男", "女"],
        sexSelect: '0',
        birthday: '请选择'
    },
    onInit() {
        this.getUserInfo()
    },
    onSexBoxShow() {
        this.$element("select-sex").show()
    },
    onSexBoxClose() {
        this.$element("select-sex").close()
    },
    onBirthdayBoxShow() {
        this.$element("select-birthday").show()
    },
    onBirthdayBoxClose() {
        this.$element("select-birthday").close()
    },
    onChangeBirthday(e) {
        this.birthday = e.year + "-" + (e.month + 1) + "-" + e.day
    },
    onChangeSex(e) {
        this.sex = e.newValue
        this.sexSelect = e.newSelected
    },
    onConfirm() {
        if (!this.name) {
            prompt.showToast({
                message: "请输入姓名"
            })
            return
        }
        if (this.birthday == "请选择") {
            prompt.showToast({
                message: "请选择生日"
            })
            return
        }
        if (!this.cardNumber) {
            prompt.showToast({
                message: "请输入身份证号"
            })
            return
        }
    },
    async getUserInfo() {
        const url = `${baseUrl}/api/members/info`
        const params = {
            extraData: {},
            header: {
                userId: userId,
                subsiteId: subsiteId,
                userSession: userSession,
            }
        }
        try {
            const res = await hmsHttp(url, params, "GET")
            console.log(JSON.stringify(res))
        }
        catch (err) {
            console.info(err)
        }
    }
}

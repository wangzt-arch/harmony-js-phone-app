import prompt from '@system.prompt';
import router from '@system.router';
import hmsHttp, {baseUrl, userId, userSession, subsiteId} from '../../common/utils.js';

export default {
    data: {
        nickname: '卖小客',
        avatar: '',
        mobile: '',
        currentNickname: '栗子2'
    },
    onInit() {
        this.onGetUserMessage()
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
            this.mobile = result.mobile
        }
        catch (err) {
            console.info(err)
        }
    },
    async onPostBase64() {
        const url = `${baseUrl}/api/pictures/base64`
        const params = {
            extraData: {
                index: 0,
                pic: 'data:image/jpeg;',
                type: 11
            },
            header: {
                userId: userId,
                subsiteId: subsiteId,
                userSession: userSession,
            }
        }
        try {
            const res = await hmsHttp(url, params, "POST")
            console.log(JSON.stringify(res))
        }
        catch (err) {
            console.info(err)
        }
    },
    onNavigateToLogin() {
        router.push({
            uri: 'pages/login/index'
        })
    },
    onNavigateToInfo() {
        router.push({
            uri: 'pages/member_info/member_info'
        })
    },
    onOpenNickname() {
        this.$element('change-nickname').show()
    },
    onCloseNickname() {
        this.$element('change-nickname').close()
    },
    onChangeNickname(e) {
        this.currentNickname = e.value
    },
    async onConfirmChangeNickname() {
        const url = `${baseUrl}/MEMBER-CENTER/front/members/mine`
        try {
            const params = {
                extraData: {
                    nick_name: this.currentNickname
                },
                header: {
                    userId: userId,
                    userSession: userSession,
                    subsiteId: subsiteId
                }
            }
            const res = await hmsHttp(url, params, 'PUT')
            console.log(JSON.stringify(res))
            console.log(res.responseCode)
            if (res.responseCode = 200) {
                this.onGetUserMessage(),
                this.onCloseNickname()
                prompt.showToast({
                    message: '修改成功',
                    duration: 3000,
                });
            }
            const result = JSON.parse(res.result)
        }
        catch (err) {
            console.info(err)
        }
    }
}

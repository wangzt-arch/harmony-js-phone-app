import hmsHttp, {baseUrl, userId, userSession, subsiteId} from '../../common/utils.js';

export default {
    data: {
        title: 'World'
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
}

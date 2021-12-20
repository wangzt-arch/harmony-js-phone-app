import router from '@system.router';
import hmsHttp, {baseUrl, userId, userSession, subsiteId} from '../../common/utils.js';

export default {
    data: {
        id: 'default',
        title: 'World',
        subsiteLists: [],
        subsiteName: '北京渔阳',
        imageAdBanner: 'https://puzhehei.oss-cn-beijing.aliyuncs.com/global/image-ad-banner.png'
    },
    onShow() {
        console.log(this.id)
        if (this.id!=='default') {
            const currentSubsite = this.subsiteLists.find((item, index) => {
                return item.id == this.id
            })
            this.subsiteName = currentSubsite.subsite_name
        }
    },
    onInit() {
        this.getSubsite()
    },
    async getSubsite() {
        const url = `${baseUrl}/api/subsites`
        const params = {
            extraData: {},
            header: {}
        }
        try {
            const res = await  hmsHttp(url, params, "GET")
            const resString = JSON.stringify(res)
            const result = JSON.parse(res.result)
            this.subsiteLists = result
            this.subsiteName = result[0].subsite_name
            console.log(resString)
        }
        catch (err) {
            console.log(err)
        }
    },
    onNavigateToSubsiteList() {
        router.push({
            uri: 'pages/subsite_list/subsite_list'
        })
    },
    onNavigateToParking() {
        router.push({
            uri: 'pages/parking/parking'
        })
    },
    onNavigateToMember() {
        router.replace({
            uri: 'pages/member_center/member_center'
        })
    }
}

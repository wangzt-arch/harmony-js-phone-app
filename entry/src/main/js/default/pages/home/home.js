import router from '@system.router';

export default {
    data: {
        title: 'World',
        subsiteName: '北京渔阳置业大厦店',
        imageAdBanner: 'https://puzhehei.oss-cn-beijing.aliyuncs.com/global/image-ad-banner.png'
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

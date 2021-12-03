import router from '@system.router';
export default {
    data: {
        nickname:'卖小客'
    },
    onNavigateTo() {
        router.push({
            uri: 'pages/parking/parking'
        })
    }
}

import router from '@system.router';

export default {
    props: ['message'],
    onSelectSubsite(id) {
        router.push({
            uri: 'pages/home/home',
            params: {
                id: id
            }
        })
    }
}
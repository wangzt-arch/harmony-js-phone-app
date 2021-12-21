import router from '@system.router';
import dataStorage from '@ohos.data.storage'
import featureAbility from '@ohos.ability.featureAbility'

export default {
    props: ['message'],
    async onSelectSubsite(id) {


        let context = featureAbility.getContext()
        let path = await context.getFilesDir()
        let storage = dataStorage.getStorageSync(path + '/mystore')
        storage.putSync('subsiteId', id)
        storage.flushSync()
        router.push({
            uri: 'pages/home/home',
            params: {
                id: id
            }
        })
    }
}
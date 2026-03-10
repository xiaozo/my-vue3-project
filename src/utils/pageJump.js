import Eventbus from '@/utils/eventbus.js'

/**
 * ///可带回调函数跳转 需要获取下个页面返回的值用此函数
 *
 * @param {*} url
 * @param {*} params
 * @param {*} returnDataItem  { target:vue实例, callback:fn}
 */
function navigateTo(url, params = {}, returnDataItem) {

    if (!!returnDataItem) {
        const finishOperateKey = getUid()
        params["FinishOperateKey"] = finishOperateKey
        Eventbus.sub(finishOperateKey, returnDataItem.target, returnDataItem.callback)
    }
    const query = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    url = `${url}?${query}`

    console.log(url);
    uni.navigateTo({
        url: url,
    });

}

export default {
    navigateTo
}

import {
	onLoad,
	onShow,
	onHide,
	onUnload
} from '@dcloudio/uni-app';
import {
	ref,
	reactive,
	nextTick,
	computed,
	markRaw,
	toRaw,
	watch
} from 'vue';


import Eventbus from '@/utils/eventbus.js'

export function pageHook(paging, userConfig = {

}) {

	// 合并配置
	const config = {
		monitorLoginSuccess: true,         ///是否监听登录成功通知，如果监听则刷新页面
		globalRefresh: true,   ///是否监听登录成功通知，如果监听则刷新页面
		needLogin: false,   ///是否需要登录
		...userConfig      // 用户传入的配置
	};

	const Tag = ref(null)
	const cPaging = !!paging ? paging.value || paging : null;

	// 3. 计算属性
	const _options = computed(() => _pagePro.options);
	const _pagePro = reactive({
		isLoad: false,
		///主页面的解析的参数
		options: {},
		///页面是否显示
		isShow: false,
		///是否onshow时候刷新
		isShowRefresh: false,
		///上一页接收数据的通知key
		finishOperateKey: '',
		///当前堆栈里第几个页面索引
		currentNavIndex: 0,
	});

	onLoad((options) => {

		// console.log("config", config);

		if (!!options.FinishOperateKey) {
			_pagePro.finishOperateKey = options.FinishOperateKey;
		}

		_pagePro.options = markRaw(options)

		_pagePro.currentNavIndex = __navIndex();

		if (!!config.monitorLoginSuccess) {
			Eventbus.sub('loginSuccess', Tag, () => {
				refresh()
			})
		}

		if (!!config.globalRefresh) {
			Eventbus.sub('globalRefresh', Tag, () => {
				refresh()
			})
		}

		nextTick(() => {
			if (!!cPaging?.value?.auto || !cPaging.value) {
				///刷新一次
				__refresh()
			}
			_pagePro.isLoad = true
		})

	})
	onUnload(() => {
		Eventbus.cancel('loginSuccess', Tag)
		Eventbus.cancel('globalRefresh', Tag)
	})

	onShow(() => {
		nextTick(() => {
			_pagePro.isShow = true

			if (!!_pagePro.isShowRefresh) {
				_pagePro.isShowRefresh = false
				refresh()
			}
		})
	})

	onHide(() => {
		nextTick(() => {
			_pagePro.isShow = false
		})
	})


	///刷新页面
	const refresh = () => {
		if (!!_pagePro.isShow) {
			__refresh()

		} else {
			_pagePro.isShowRefresh = true
		}
	}

	////请求方法
	const requestMainData = (...args) => {

		// ///方法中转
		// const t = (...args) => {
		// 	const context = {
		// 		name: 'CustomContext',
		// 		timestamp: Date.now()
		// 	};
		// 	// console.log('所有参数:', args); // args 是一个数组
		// 	return t1.call(paging.value, ...args)
		// }

		// function t1(url, data = {}) {
		// 	console.log(this); // args 是一个数组
		// 	return new Promise(function(resolve, reject) {
		// 		resolve(data)
		// 	})
		// }

	}

	const __navIndex = () => {
		var pages = getCurrentPages();
		return Math.max(pages.length, 1) - 1;
	}

	const __refresh = () => {
		if (!!cPaging.value) {
			cPaging.value._options = toRaw(_options.value)
			cPaging.value?.reload()
		} else {
			config.pageLoad?.(toRaw(_options.value))
		}
	}


	return {
		_options,
		_pagePro,
		refresh,
		requestMainData
	};
}
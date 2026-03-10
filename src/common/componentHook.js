

import { watch, computed, onMounted, onUnmounted, nextTick, toRef } from 'vue';
import { ref } from 'vue';
import Eventbus from '@/utils/eventbus.js'

export const baseComponentPageProps = {
	pagePro: {
		type: Object,
		default: function () {
			return {
				options: {},
				isShow: false
			}
		},
	},
	//当前组件的index，也就是当前组件是swiper中的第几个
	tabIndex: {
		type: Number,
		default: function () {
			return 0;
		},
	},
	//当前swiper切换到第几个index
	currentIndex: {
		type: Number,
		default: function () {
			return 0;
		},
	},
	////当前组件的模式，tabs：适用于MyTabsSwiper组件内  common:普通模式
	model: {
		type: String,
		default: 'tabs'
	}
};

export function componentPageHook(props, paging, userConfig = {

}) {

	// 合并配置
	const config = {
		// monitorLoginSuccess: true, ///是否监听登录成功通知，如果监听则刷新页面
		// globalRefresh: true,   ///是否监听登录成功通知，如果监听则刷新页面
		// needLogin: false,   ///是否需要登录
		...userConfig      // 用户传入的配置
	};

	const Tag = ref(null)

	const cPaging = !!paging ? paging.value || paging : null;

	const _options = computed(() => props.pagePro?.options || {});

	const isShow = computed(() => props.pagePro?.isShow || false);

	const _mainPageIsShow = toRef(isShow)

	const _componentPro = {
		firstLoadedData: false,
		isShowRefresh: false,
		isLoad: false,

	}

	// 监听 isShow
	watch(isShow, (newValue, oldValue) => {
		__pageStatusHandle()
	});

	onMounted(() => {

		Eventbus.sub('loginSuccess', Tag, () => {
			refresh()
		})

		Eventbus.sub('GlobalRefresh', Tag, () => {
			refresh()
		})

		nextTick(() => {
			///如果IsLoad没有加载过，就加载一个__pageStatusHandle
			if (!_componentPro.isLoad) {
				__pageStatusHandle()
			}
		});

	});

	onUnmounted(() => {
		Eventbus.cancel('loginSuccess', Tag)
		Eventbus.cancel('GlobalRefresh', Tag)

	});

	const refresh = (firstLoad = false) => {
		if (_componentPro.isShowRefresh) return
		if (props.model != 'tabs') {
			_componentPro.firstLoadedData = true
		}

		if (!firstLoad && !_componentPro.firstLoadedData && !_componentPro.isLoad) {
			return
		}

		cPaging?.value?.reload()
	}

	const __pageStatusHandle = () => {
		refresh()
		if (!!isShow.value) {
			///显示页面
			if (!!_componentPro.isShowRefresh) {
				_componentPro.isShowRefresh = false
				refresh()
			}

			config.onComponentPageShow?.()

			!_componentPro.isLoad && nextTick(() => _componentPro.isLoad = true)
		} else {
			///隐藏页面
			config.onComponentPageHide?.()
		}
	}

	return {
		_options,
		_componentPro,
		_mainPageIsShow ////主页面是否显示
	};
}


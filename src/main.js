import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import uViewPro from 'uview-pro'
// import mixin from './common/mixin'
import store from './store' // store


// ///代理
// const proxyFn = () => {
// 	// 在应用初始化时
// 	uni.setNavigationBarTitle = new Proxy(uni.setNavigationBarTitle, {
// 		apply(target, thisArg, argumentsList) {
// 			const [options] = argumentsList
// 			console.log(options)
// 			console.log('正在设置导航栏标题:', options.title)
// 			const pages = getCurrentPages()
// 			const currentPage = pages[pages.length - 1]

// 			const customNavBar = currentPage?.$vm?.$refs?.paging?.$refs?.customNavbar
// 			|| currentPage?.$vm?.$refs?.tabsSwiper?.$refs?.customNavbar
// 			if (!!customNavBar) {
// 				console.log('正在设置customNavBar导航栏标题:', options.title)
// 			    customNavBar?.setTitle(options.title)

// 			}

// 			// 调用原始方法
// 			return Reflect.apply(target, thisArg, argumentsList)
// 				.then(() => {
// 					console.log('导航栏标题设置成功')
// 					return Promise.resolve()
// 				})
// 				.catch(err => {
// 					console.error('设置导航栏标题失败:', err)
// 					return Promise.reject(err)
// 				})
// 		}
// 	})
// }

// proxyFn()

export function createApp() {
	const app = createSSRApp(App);
	 app.use(store)
	app.use(uViewPro)
	// app.mixin(mixin)
	// app.config.globalProperties.$requestV2 = requestV2
	return {
		app,
	};
}

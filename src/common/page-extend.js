import Eventbus from '@/utils/eventbus.js'

const mixin = {
    data() {
        return {
            ///默认参数
            _options: {},
            ///子组件页面配置
            componentPagePro: {
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
            },
        }
    },
    onLoad(options) {
        let that = this;

        if (!!options.FinishOperateKey) {
            this.componentPagePro.finishOperateKey = options.FinishOperateKey;
        }

        this.componentPagePro.options = this._options = options
        this.componentPagePro.currentNavIndex = this.navIndex();
        console.log("currentNavIndex", this.componentPagePro.currentNavIndex);

        if (!!this.monitorLoginSuccess()) {
            Eventbus.sub('loginSuccess', this, () => {
                that.refreshNF()
            })
        }
        if (!this.$refs.paging) {
            this.$nextTick(() => {
                this.onTLoad(options)
            })
        }
    },
    onShow() {
        this.$nextTick(
            () => {

                this.componentPagePro.isShow = true

                if (!!this.componentPagePro.isShowRefresh) {
                    this.componentPagePro.isShowRefresh = false
                    this.refresh()
                }
            }
        )

    },

    onHide() {
        this.$nextTick(
            () => {
                this.componentPagePro.isShow = false
            }
        )
    },
    onUnload() {
        if (!!this.componentPagePro.finishOperateKey.length) {
            Eventbus.cancel(this.componentPagePro.finishOperateKey)
        }

        Eventbus.cancel('loginSuccess', this)


    },
    methods: {
        ////需要下拉刷新的时候调用的请求写在这里面，也面重写
        onTLoad(options) {
            console.log("page-extend-onTLoad");

            ////第一次加载将isLoad赋值为true
            if (!this.componentPagePro.isLoad) {
                this.$nextTick(() => {
                    this.componentPagePro.isLoad = true
                })
            }

            this.pageLoad?.(options)

        },
        ////下拉刷新分页函数，页面重写
        queryList(pageNo, pageSize) {
            if (pageNo == 1) {
                this.onTLoad(this._options)

            }

            this.pageQueryList?.(pageNo, pageSize)

        },
        ///获取当前堆栈第几个页面索引
        navIndex() {
            var pages = getCurrentPages();
            return Math.max(pages.length, 1) - 1;
        },
        ///刷新真个页面 调用onTLoad函数，调用下拉刷新分页为1
        ///firstLoad 是否是第一次进入页面也刷新,防止同时调用onTLoad()函数
        refresh(firstLoad = false) {
            if (this.componentPagePro.isShowRefresh) return
            if (!firstLoad && !this.componentPagePro.isLoad) return

            if (!!this.$refs.paging) {
                this.$refs.paging.reload()
            } else {
                this.onTLoad(this._options)
            }
        },
        ///当通知刷新页面时的函数，调用此函数在页面show的时候为调用一次refresh()函数
        showRefresh() {
            this.componentPagePro.isShowRefresh = true
        },
        ///通知页面刷新
        refreshNF() {
            var pages = getCurrentPages();
            var page = pages[pages.length - 1];
            if (page.$vm == that) {
                ///在当前页面刷新
                this.refresh()
            } else {
                ///show后刷新页面
                this.showRefresh()
            }
        },
        ///页面返回 data返回给上一个页面的数据
        navigateBack(data) {

            if (!!data) {
                Eventbus.pub(this.componentPagePro.finishOperateKey, data);
            }
            uni.navigateBack({
                delta: 1
            });
            return true
        },
        ///是否监听登录成功通知，如果监听则刷新页面
        monitorLoginSuccess() {
            return true
        },
        ///是否监听登录成功通知，如果监听则刷新页面
        globalRefresh() {
            return true
        },
        ///是否需要登录
        needLogin() {
            return false
        },

    }
}

export default mixin
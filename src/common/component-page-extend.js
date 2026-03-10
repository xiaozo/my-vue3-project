
import Eventbus from '@/utils/eventbus.js'
const mixin = {
    props: {
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
    },

    data() {
        return {
            ///默认参数
            _options: {},
            firstLoadedData: false,
            IsShowRefresh: false,
            IsLoad: false
        }
    },
    destroyed() {
        Eventbus.cancel('loginSuccess', this)
        Eventbus.cancel('GlobalRefresh', this)
    },
    created() {
        let that = this;
        this._options = this.pagePro.options;
        // this.$nextTick(
        //     () => {
        //         if (!this.$refs.paging) {
        //             this.onTLoad(this._options)
        //         }
        //     }
        // )

        Eventbus.sub('loginSuccess', this, () => {
            this.refresh()
        })

        Eventbus.sub('GlobalRefresh', this, () => {
            this.refresh()
        })


    },
    watch: {
        'pagePro.isShow'(newVal) {
            if (!!newVal) {
                if (!!this.IsShowRefresh) {
                    this.IsShowRefresh = false
                    this.refresh()
                }
                this.$nextTick(() => {
                    this.IsLoad = true
                })
                this?.onComponentPageShow()
            } else {
                this?.onComponentPageHide()
            }
        },
        currentIndex: {
            handler(newVal) {

                // if (newVal === this.tabIndex) {
                if (Math.abs(newVal - this.tabIndex) < 2) {
                    //懒加载，当滑动到当前的item时，才去加载
                    if (!this.firstLoadedData && this.model == 'tabs') {
                        setTimeout(() => {
                            this.refresh(true)
                            this.firstLoadedData = true;
                        }, 100);

                    }
                }
            },
            immediate: true,
        },
    },
    methods: {
        onTLoad(options) {
            this.pageLoad?.(options)

        },
        queryList(pageNo, pageSize) {
            if (pageNo == 1) {
                this.onTLoad(this._options)
            }
            this.pageQueryList?.(pageNo, pageSize)
        },
        refresh(firstLoad = false) {
            if (this.IsShowRefresh) return
            if (this.model != 'tabs') {
                this.firstLoadedData = true
            }

            if (!firstLoad && !this.firstLoadedData && !this.IsLoad) {
                return
            }


            if (!!this.$refs.paging) {
                this.$refs.paging.reload()
            } else {
                this.onTLoad(this._options)
            }
        },
        ///当通知刷新页面时的函数，调用此函数在页面show的时候为调用一次refresh()函数
        showRefresh() {
            this.IsShowRefresh = true
        },
    }
}

export default mixin
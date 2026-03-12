<template>
  <my-paging ref="paging" v-model="list" @query="queryList" :empty-view-text="'没有数据啦11122'"
    :loading-more-enabled="true">
    <!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
    <template #top>
      <custom-navbar ref="customNavbar" :fixed="false" :dark="false" titleFontSize="15px" statusBar></custom-navbar>
    </template>

    <view class="content">
      <image class="logo" src="/static/logo.png"></image>
      <view class="ba-flex-col-start">
        <text class="title">{{ title }}</text>
        <u-icon name="photo"></u-icon>
        <u-button>月落</u-button>
        <u-button type="success" @click="clickFn">成功按钮</u-button>
      </view>
    </view>
  </my-paging>

</template>

<script>
import mixin from "@/common/page-extend.js";
import mixin1 from "@/common/component-page-extend.js";
export default {
  mixins: [mixin],
  data() {
    return {
      title: 'Hello',
      list: []
    }
  },
  onLoad() {
    // console.log(this.setData);
    // this.$requestV2();


  },
  methods: {
    pageLoad(options) {
      var pages = getCurrentPages();
      var page = pages[pages.length - 1];
      // console.log("onBeforeMount1",page.$vm.$refs) 
      console.log("pageLoadpageLoad");
      

    },
    pageQueryList(pageNo, pageSize) {
      // 模拟接口请求
      console.log("queryList")
      this.$refs.paging.complete()
    },
    t() {
      // 转为字符串
      const strValue = '10px'
      // 匹配数字和单位
      const match = strValue.match(/^(\d+(?:\.\d+)?)(px|rpx)?$/i)

      if (!match) {
        // 如果不符合格式，返回原始值
        return strValue
      }

      const [, num] = match
      return `${num * 2}`
    },
    clickFn() {

      console.log("clickFn")
      this.refresh()

    }
  },
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 300rpx;
  background: red;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>

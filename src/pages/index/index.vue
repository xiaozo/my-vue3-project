<template>
  <!-- 此时使用了页面的滚动，z-paging不需要有确定的高度，use-page-scroll需要设置为true -->
  <my-paging ref="paging" v-model="dataList" @query="queryList" @pageLoad="pageLoad" :empty-view-text="'没有数据啦11122'">
  <!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
  <!-- 使用组件 -->

  <!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
  <!-- <template #top>
      <custom-navbar ref="customNavbar" :fixed="false" :dark="false" titleFontSize="15px" statusBar></custom-navbar>
    </template> -->

  <view class="content">
    <SimpleComponent :pagePro="_pagePro" v-if="showSimple" model="common" />
    <image class="logo" src="/static/logo.png"></image>
    <view class="ba-flex-col-start">
      <u-icon name="photo"></u-icon>
      <u-button>月落</u-button>
      <u-button type="success" @click="clickfn">成功按钮</u-button>
      {{ _options }}
     
    </view>
  </view>
  </my-paging>
</template>

<script setup>
import Eventbus from '@/utils/eventbus.js'
import SimpleComponent from '@/components/SimpleComponent.vue'
import {
  ref,
  onBeforeMount,
  nextTick,
  onMounted,
  reactive,
} from 'vue';
// 必须导入需要用到的页面生命周期（即使在当前页面上没有直接使用到）
import {
  onLoad
} from '@dcloudio/uni-app';
import {
  pageHook
} from "@/common/pageHook.js"

import {storeRef} from "@/common/globalData.js"

const paging = ref(null)
const {
  _options,
  _pagePro,
  refresh
} = pageHook(paging, {
  
});
// import useZPaging from "@/uni_modules/z-paging/components/z-paging/js/hooks/useZPaging.js";


const dataList = ref([])

const showSimple = ref(true)

// 在合适的生命周期中获取
// onBeforeMount(() => {
// 	console.log("onBeforeMount")

// });
// onMounted(
// 	() => {
// 		console.log("onMounted")

// 	})

onLoad(() => {
  // console.log("useZPaginguseZPaginguseZPaging111",Options.value)


})

const queryList = (pageNo, pageSize) => {
  // 模拟接口请求
  console.log("queryList")
  paging.value.complete([{
  	"title": "wwwww"
  }])

};

// const pageLoad = () => {
 
//   // t("ddd", {
//   // 	t: "cccc"
//   // }).then((t) => {


//   // })
// }

function pageLoad(options) {
   console.log("pageLoad",options)
  // paging.value.complete()
}

const clickfn = () => {
  console.log("clickfn",_options);
  // Eventbus.pub('loginSuccess')
  // showSimple.value = false
  // storeRef.value = {"name":"zlx"}
  refresh()

}

// 其他省略
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

<template>
	<view>
		<text @click="handleClick">simple</text>
	</view>
</template>

<script setup>
import { onMounted, onBeforeMount } from 'vue';
import { componentPageHook, baseComponentPageProps } from "@/common/componentHook.js"

// 定义组件的 props
const props = defineProps({
	...baseComponentPageProps, // 继承基础属性
})

const { _options, _componentPro, _mainPageIsShow } = componentPageHook(props, null, {
	onComponentPageShow: () => {
		console.log("组件页面显示", _componentPro, _mainPageIsShow.value);

	}
});

const handleClick = () => {


}
</script>

<style></style>
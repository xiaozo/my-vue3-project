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

const { _mainPageOptions, _componentPro, _mainPageIsShow,refresh } = componentPageHook(props, null, {
	onComponentPageShow: () => {
		console.log("组件页面显示", _componentPro, _mainPageIsShow.value);

	},
	pageLoad:(options)=>{
		const params = {..._mainPageOptions.value, ...options}
		console.log("组件页面加载", params);
		
	}
});

const handleClick = () => {
	refresh()

}
</script>

<style></style>
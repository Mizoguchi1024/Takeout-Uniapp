<template>
	<view class="content">
		<up-search v-model="keyword" @clickIcon="onSearch" @search="onSearch" @custom="onSearch" style="width: 100%; margin-bottom: 20px;"></up-search>
		<view style="width: 100%; margin-top: 20px; margin-bottom: 20px;">
			<text>热门搜索</text>
		</view>
		<up-grid :border="false" col="4" @click="onHotSearchClicked" style="width: 100%;">
			<up-grid-item v-for="(item, index) in hotSearchList" :key="index" :name="item.name" style="margin-bottom: 12px;">
				<up-tag :text="item.name" shape="circle" color="#000" bgColor="#f1f1f1" borderColor="transparent" @click="onHotSearchClicked(item.name)"></up-tag>
			</up-grid-item>
		</up-grid>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'

const keyword = ref('')

function onSearch() {
	if(keyword.value == ''){
		uni.showToast({
			title: '请输入关键字',
			icon: 'error',
			duration: 2000
		})
	}
	else{
		uni.navigateTo({
		    url: `/pages/searchResults/searchResults?query=${encodeURIComponent(keyword.value)}`
		})
	}
}


const hotSearchList = reactive([
	{name: '真味茶泡饭'},
	{name: '盖浇饭'},
	{name: '提瓦特煎蛋'},
	{name: '杨梅果茶'},
	{name: '蜜雪冰城'},
	{name: '甜甜花酿鸡'},
	{name: '麦当劳'}
])

function onHotSearchClicked(name) {
	keyword.value = name;
	onSearch();
}

</script>

<style>
.content {
	padding: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>

<template>
	<view style="display: flex; flex-direction: column; width: 100vw; height: 100vh;">
		<up-sticky bgColor="#f2f2f2" style="width: 100%; display: flex; justify-content: center;">
			<up-tabs :list="tabList" @click="onTabClicked"></up-tabs>
		</up-sticky>
		<view v-if="1" style="flex: 1; display: flex; justify-content: center;">
			<up-empty mode="order"></up-empty>
		</view>
	</view>
	
</template>

<script setup>
import {ref, reactive} from 'vue'

const tabList = reactive([
	{name: '全部'},
	{name: '待消费'},
	{name: '待评价'},
	{name: '退款'}
])

function onTabClicked(item) {  
    console.log('item', item);  
}  
</script>

<style>
	       
</style>

<template>
	<view class="content">
		<up-search v-model="keyword" @clickIcon="onSearch" @search="onSearch" @custom="onSearch" style="margin-bottom: 20px;"></up-search>
	</view>
</template>

<script setup>
import {ref} from 'vue'

const keyword = ref('')
</script>

<style>
	.content{
		padding-inline: 5px;
	}
</style>

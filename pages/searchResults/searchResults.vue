<template>
	<view>
		搜索 “{{ query }}” 的结果
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {ref} from 'vue'

const query = ref('')

onLoad((options)=>{
	query.value = decodeURIComponent(options.query || '')
})
</script>

<style>
	       
</style>

<template>
	<view class="content">
		<up-sticky style="width: 100%;">
			<view class="row" style="justify-content: space-between;">
				<view class="row">
					<up-avatar :src="avatarSrc" size="28"></up-avatar>
					<text>地址</text>
				</view>
				<view class="row">
					<up-icon @click="" name="shopping-cart" size="32"></up-icon>
					<up-icon @click="onChatClicked" name="chat" size="28"></up-icon>
				</view>
			</view>
			<up-search v-model="keyword" search-icon="scan" :disabled="true" @click="onSearchClicked" @clickIcon="onScan" @search="onSearch" @custom="onSearch" style="margin-bottom: 5px;"></up-search>
			<view class="row" style="gap: 8px;">
				<up-tag v-for="(listItem,listIndex) in tagList" :key="listIndex" :text="listItem.name" @click="onTagClicked(listIndex)" shape="circle" color="#000000" bgColor="#f2f2f2" borderColor="#f2f2f2"></up-tag>
			</view>
			<view class="row">
				<up-tag text="满减" type="error"></up-tag>
				全场满30减5，满38减10，满48减15
				<up-tag text="领取优惠券" type="error" @click="onCouponClicked"></up-tag>
			</view>
			<up-notice-bar :text="noticeText" direction="column"></up-notice-bar>
		</up-sticky>
		<up-grid :border="false" @click="onGridClicked" col="5" style="width: 100%; height: 180px;">
		    <up-grid-item v-for="(listItem,listIndex) in gridList" :key="listIndex">
		        <up-image :src="listItem.src" width="42" height="42"></up-image>
		        <text class="grid-text">{{listItem.title}}</text>
		    </up-grid-item>
		</up-grid>
		<up-tabs :list="tabsList" @click="onTabClicked"></up-tabs>
		
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'

const avatarSrc = ref('')

function onChatClicked(){
	uni.navigateTo({
	    url: '/pages/message/message'
	})
}
  
const keyword = ref('甜甜花酿鸡')


function onScan() {
	uni.scanCode({
	    onlyFromCamera: false, // 设置为 true 只能用摄像头，false 则支持相册选取
	    success: res => {
	        console.log('扫描结果：', res.result);
			if(res.result != ''){
				uni.navigateTo({
				    url: `/pages/searchResults/searchResults?query=${encodeURIComponent(res.result)}`
				})
			}
	    },
	    fail: err => {
	        console.log('扫描失败：', err);
		}
	});
}

function onSearchClicked(){
	uni.navigateTo({
	    url: '/pages/search/search'
	})
}

function onSearch(){
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

const tagList = reactive([
	{
		name: "南京烤鸭"
	},
	{
		name: "杨梅果茶"
	},
	{
		name: "抹茶星冰乐"
	},
	{
		name: "提瓦特煎蛋"
	}
])

function onTagClicked(index) {
	uni.navigateTo({
	    url: `/pages/searchResults/searchResults?query=${encodeURIComponent(tagList[index].name)}`
	})
}

function onCouponClicked() {
	console.log("Clicked!")
}

const noticeText = ref(['欢迎光临', '你好呀~', '公告：富态徐晨阳就是点外卖点出来的'])


const gridList = reactive([  
    {  
        src: '/static/icons/turkey.png',  
        title: '美食外卖'  
    },  
    {  
        src: '/static/icons/basket.png',  
        title: '超市便利'  
    },  
    {  
        src: '/static/icons/meal.png',  
        title: '美食团购'  
    },  
    {  
        src: '/static/icons/female.png',  
        title: '丽人医美'  
    },  
    {  
        src: '/static/icons/mic.png',  
        title: '休闲玩乐'  
    },  
    {  
        src: '/static/icons/egg.png',
        title: '便利早餐'  
    },
	{
	    src: '/static/icons/fruit.png',
	    title: '新鲜水果'  
	},
	{
	    src: '/static/icons/vegetable.png',
	    title: '优惠买菜'  
	},
	{
	    src: '/static/icons/medicine.png',
	    title: '药物购买'  
	},
	{
	    src: '/static/icons/bike.png',
	    title: '跑腿服务'  
	},
]);

function onGridClicked(){
	console.log("Clicked!")
}

const tabsList = reactive([
	{name: '附近推荐'},
	{name: '发现美食'},
	{name: '水果'},
	{name: '买菜'}
])

function onTabClicked(item) {  
    console.log('item', item);  
}  


</script>

<style scoped>
	.content {
		padding-inline: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.row {
		margin-bottom: 10px;
		display: flex; 
		flex-direction: row; 
		align-items: center;
	}
</style>

<template>
	<view class="content">
		<up-sticky style="width: 100%; background-color: #fff;">
			<view class="row" style="justify-content: space-between; background-color: #f2f2f2; padding-inline: 15px; padding-top: 8px; padding-bottom: 8px;">
				<view @click="onAddressClicked" style="display: flex; flex-direction: row; align-items: center; gap: 10px;">
					<up-avatar :src="userStore.avatar" size="42" mode="aspectFill"></up-avatar>
					<text style="color: #000; font-size: 20px;">{{addressStore.addressList[0]?.districtName || '暂无地址'}}</text>
				</view>
				<view style="display: flex; flex-direction: row; align-items: center; gap: 10px;">
					<up-icon @click="onCartClicked" name="shopping-cart" size="46"></up-icon>
					<up-icon @click="onChatClicked" name="chat" size="40"></up-icon>
				</view>
			</view>
			<view style="padding-inline: 15px;">
				<up-search v-model="keyword" search-icon="scan" :disabled="true" @click="onSearchClicked" @clickIcon="onScan" @search="onSearch" @custom="onSearch" style="margin-bottom: 5px;"></up-search>
				<view class="row">
					<up-tag v-for="(listItem,listIndex) in tagList" :key="listIndex" :text="listItem.name" @click="onTagClicked(listIndex)" shape="circle" color="#000000" bgColor="#f2f2f2" borderColor="#f2f2f2"></up-tag>
				</view>
				<view class="row">
					<up-tag text="满减" type="error"></up-tag>
					<text style="flex: 1;">超多优惠券等你来领</text>
					<up-tag text="领取优惠券" type="error" @click="toggleCouponPopup"></up-tag>
				</view>
				<up-popup :show="isPopupShow" mode="center" @close="toggleCouponPopup" round="12" :safeAreaInsetBottom="false">
					<up-card title="领取优惠券" padding="12" margin="0px" :border="false">
						<template #body>
							<view v-for="(item, index) in couponList"  :key="index">
								<view style="display: flex; flex-direction: row; justify-content: space-between; gap: 40px; margin-inline: 16px;">
									<up-image src="/static/icons/coupon.png" width="42" height="42"></up-image>
									<view style="display: flex; flex-direction: column;">
										<text style="color: #000;">{{item.title}}</text>
										<text>{{item.rule}}</text>
										<text>{{item.expire}}</text>
									</view>
									<view style="display: flex; flex-direction: column;">
										<text style="color: #ff0000; font-weight: bold; font-size: 20px;">￥{{item.amount}}</text>
										<up-button text="领取" @click="onReceiveCoupon(index)" :disabled="item.isDisabled" size="mini" shape="circle" color="#fb642a" style="width: 50px;"></up-button>
									</view>
								</view>
								<hr v-if="index < couponList.length - 1" style=" margin-top: 15px; margin-bottom: 15px;">
							</view>
						</template>
						<template #foot>
							<up-button text="关闭" @click="toggleCouponPopup" shape="circle" type="primary"></up-button>
						</template>
					</up-card>
				</up-popup>
				<up-notice-bar :text="noticeText" direction="column"></up-notice-bar>
			</view>
		</up-sticky>
		<view style="padding-inline: 15px; box-sizing: border-box; width:100%;">
			<up-grid :border="false" @click="onGridClicked" col="5" style="width: 100%; height: 180px;">
				<up-grid-item v-for="(listItem,listIndex) in gridList" :key="listIndex">
					<up-image :src="listItem.src" width="42" height="42"></up-image>
					<text class="grid-text">{{listItem.title}}</text>
				</up-grid-item>
			</up-grid>
		</view>
		<up-tabs :list="tabList" @click="onTabClicked"></up-tabs>
		<up-empty v-if="shopList[tabIndex].length == 0" mode="list"></up-empty>
		<view v-else>
			<up-card v-for="(shop, index) in shopList[tabIndex]" :key="index" @click="onShopClicked" :show-head="false" :border="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)">
				<template #body>
					<view style="display: flex; flex-direction: row; justify-content: space-between; align-items: stretch; gap: 30px;">
						<up-image :src="shop.image" width="100" height="100" radius="8"></up-image>
						<view style="display: flex; flex-direction: column; justify-content: space-between;">
							<text style="color: #1d1d1f; font-size: 22px; font-weight: bold;">{{shop.name}}</text>
							<view>
								<text>{{shop.score + ' ' + shop.sale+ ' '+ shop.time}}</text>
								<text>{{shop.floor}}</text>
							</view>
						</view>
						<text>{{shop.distance}}</text>
					</view>
				</template>
			</up-card>
		</view>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {useUserStore} from '@/store/user.js'
import {useAddressStore} from '@/store/address.js'
import {onLoad} from '@dcloudio/uni-app'

const userStore = useUserStore()
const addressStore = useAddressStore()


function onAddressClicked(){
	uni.navigateTo({
		url: '/pages/address/address'
	})
}


function onCartClicked() {
	uni.showToast({
		icon:'error',
		title:'该页面未开发'
	})
}

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

const isPopupShow = ref(false)

const couponList = reactive([
	{
		title: '店铺通用优惠劵',
		rule: '无门槛',
		expire: '2025-11-19到期',
		amount: '10',
		isDisabled: false
	},
	{
		title: '店铺通用优惠劵',
		rule: '满30减5',
		expire: '2025-11-19到期',
		amount: '5',
		isDisabled: false
	},
	{
		title: '店铺通用优惠劵',
		rule: '满42减8',
		expire: '2025-11-19到期',
		amount: '8',
		isDisabled: false
	},
	{
		title: '店铺通用优惠劵',
		rule: '满100减16',
		expire: '2025-11-19到期',
		amount: '16',
		isDisabled: false
	}
])


function toggleCouponPopup() {
	isPopupShow.value = !isPopupShow.value
}

function onReceiveCoupon(index) {
	uni.showToast({
		title: '领取成功'
	})
	couponList[index].isDisabled = true
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
	uni.showToast({
		icon: 'error',
		title: '该页面未开发'
	})
}

const tabIndex = ref(0)

const tabList = reactive([
	{name: '附近推荐'},
	{name: '发现美食'},
	{name: '水果'},
	{name: '买菜'}
])

function onTabClicked(item) {  
    tabIndex.value = item.index
}  

const shopList = reactive([
	[
		{
			name:'望舒客栈',
			score:'4.8分',
			sale:'月售10000+',
			time:'40分钟',
			distance:'1km',
			floor:'起送￥20',
			image:'https://mizo.oss-cn-nanjing.aliyuncs.com/f782beb3-1be0-429f-8ee3-849cc289828d.png'
		},
		{
			name:'万民堂',
			score:'5.0分',
			sale:'月售20000+',
			time:'30分钟',
			distance:'0.8km',
			floor:'起送￥18',
			image:'https://mizo.oss-cn-nanjing.aliyuncs.com/f79946ab-58df-45c0-aacb-5ebf38f40e95.png'
		},
		{
			name:'蜜雪冰城',
			score:'4.2分',
			sale:'月售30000+',
			time:'60分钟',
			distance:'2km',
			floor:'起送￥20',
			image:'https://mizo.oss-cn-nanjing.aliyuncs.com/1039f896-1cea-4d86-9163-2b75a9be2eb9.png'
		}
	],
	[],[],[]
])

function onShopClicked(){
	uni.navigateTo({
		url: '/pages/shop/shop'
	})
}

onLoad(async ()=>{
	try{
		await userStore.login()
		await userStore.getProfile()
		await addressStore.getAddressList()
		await toggleCouponPopup()
	}catch(err){
		console.error('初始化失败', err)
	}
})

</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.row {
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 10px;
	display: flex; 
	flex-direction: row; 
	align-items: center;
	gap: 8px;
}
</style>

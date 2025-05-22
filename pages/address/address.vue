<template>
	<view class="content">
		<up-float-button :isMenu="false" bottom="50px" @click="onInsert"></up-float-button>
		<up-card v-for="(address, addressIndex) in addressStore.addressList" :key="addressIndex" :title="address.consignee + ' ' + sexMap[address.sex]" :sub-title=address.phone :border="false" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)">
			<template #body>
				<view style="display: flex; flex-direction: column;">
					<text>{{address.provinceName + address.cityName + address.districtName}}</text>
					<text style="color: #1d1d1f; font-size: 20px;">{{address.detail}}</text>
				</view>
			</template>
			<template #foot>
				<view style="display: flex; flex-direction: row; justify-content: space-between;">
					<up-checkbox label="默认地址" name="default" @change="onCheckBoxChanged(address.id)" usedAlone :checked="isDefaultMap[address.isDefault]" :disabled="isDefaultMap[address.isDefault]" :customStyle="{marginBottom: '8px'}"></up-checkbox>
					<view style="display: flex; flex-direction: row; gap: 10px;">
						<up-button text="修改" @click="onUpdate(address.id)" type="primary" shape="circle"></up-button>
						<up-button text="删除" @click="onDelete(address.id)" type="error" shape="circle"></up-button>
					</view>
				</view>
			</template>
		</up-card>
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {onLoad, onShow} from '@dcloudio/uni-app'
import { useAddressStore } from '@/store/address'

const addressStore = useAddressStore()

const sexMap = {
	0:'女士',
	1:'先生'
}

const isDefaultMap = {
	0:false,
	1:true
}

async function onCheckBoxChanged(id){
	await addressStore.setDefault(id)
	await addressStore.getAddressList()
}

function onInsert(){
	uni.navigateTo({
		url:'/pages/addressEdit/addressEdit?method=insert'
	})
}

function onUpdate(id){
	uni.navigateTo({
		url:`/pages/addressEdit/addressEdit?id=${encodeURIComponent(id)}&method=update`
	})
}

async function onDelete(id){
	await addressStore.deleteAddress(id)
	await addressStore.getAddressList()
}



onShow(async()=>{
	try{
		await addressStore.getAddressList()
	}catch(err){
		console.error('刷新失败', err)
	}
})

</script>

<style>
.content{
	padding: 15px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: stretch;
}
</style>

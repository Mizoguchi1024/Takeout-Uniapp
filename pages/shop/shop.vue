<template>
	<view class="content">
		<view style="padding-inline: 15px; padding-top: 15px;">
			<up-image :src="shopStore.bannerSrc" radius=12 width="100%" height="130" style="margin-bottom: 20px;"></up-image>
			<up-card :show-head="false" :border="false" margin="0px" box-shadow="0px 0px 16px rgba(0, 0, 0, 0.25)" style="margin-bottom: 20px;">
				<template #body>
					<view style="display: flex; flex-direction: row; justify-content: space-between; align-items: stretch; gap: 20px;">
						<up-image :src="shopStore.shopList[0][0].image" width="100" height="100" radius="8"></up-image>
						<view style="display: flex; flex-direction: column; justify-content: space-between;">
							<text style="color: #1d1d1f; font-size: 22px; font-weight: bold;">{{shopStore.shopList[0][0].name}}</text>
							<view style="display: flex; flex-direction: column;">
								<text>{{shopStore.shopList[0][0].score + ' ' + shopStore.shopList[0][0].sale+ ' '+ shopStore.shopList[0][0].time}}</text>
								<text>{{shopStore.shopList[0][0].floor}}</text>
							</view>
						</view>
						<text>{{shopStore.shopList[0][0].distance}}</text>
					</view>
				</template>
			</up-card>
		</view>
		<up-cate-tab class="cate-tab" :tabList="shopStore.dishList" tabKeyName="name" itemKeyName="name">
            <template #pageItem="{pageItem}">
                <view style="width: 100%;">
                    <up-cell-group :border='false'>
                        <up-cell :border='false'>
                            <template #icon>
                                <up-image :src="pageItem.image" width="80px" height="80px"></up-image>
                            </template>
                            <template v-slot:title>
                                <view style="color: #1d1d1f; font-size: 16px; font-weight: bold;">
                                    {{ pageItem.name }}
                                </view>
                            </template>
                            <template v-slot:label>
								<view style="display: flex; flex-direction: column; gap: 8px; width: 140px;">
									<text style="font-size: 12px;">{{ pageItem.description }}</text>
                                    <text style="color: #ff2124; font-size: 16px;">￥{{ pageItem.price }}</text>
                                </view>
                            </template>
                            <template v-slot:value>
								<up-icon @click="onAddShoppingCart(pageItem.id)" name="plus-circle-fill" color="#f7a557" size="28"></up-icon>
                            </template>
                        </up-cell>
                    </up-cell-group>
                </view>
            </template>
        </up-cate-tab>
		<view @click="onShoppingCartClicked" style="background-color: #fff; position: fixed; bottom: 20px; right: 50px; border-radius: 50%; box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);">
			<up-icon name="shopping-cart" color="#f7a557" size="34" style="margin: 8px;"></up-icon>
		</view>
	</view>
</template>

<script setup>
import { useShopStore } from '@/store/shop'
import { useShoppingCartStore } from '@/store/shoppingCart'
import { onLoad } from '@dcloudio/uni-app'

const shopStore = useShopStore()
const shoppingCartStore = useShoppingCartStore()

async function onAddShoppingCart(dishId){
	await shoppingCartStore.addShoppingCart(dishId)
}


function onShoppingCartClicked(){
	uni.navigateTo({
		url:'/pages/shoppingCart/shoppingCart'
	})
}

onLoad(async () => {
    await shopStore.getDishList()
})

</script>

<style lang='scss' scoped>
.content{
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.cate-tab {
    height: calc(100vh - 320px);
    /* #ifdef H5 */
    height: calc(100vh - 320px - var(--window-top));
    /* #endif */
	.text-red {
		color: red;
	}
}
</style>

import { defineStore } from "pinia"
import { ref, reactive } from "vue"
import { apiShopCategoryList, apiShopDishList} from '@/utils/api/shop.js'

export const useShopStore = defineStore('shop', () => {
    const shopList = reactive([
        [
            {
                name:'望舒客栈',
                score:'4.8分',
                sale:'月售1000+',
                time:'40分钟',
                distance:'1km',
                floor:'起送￥20',
                image:'https://mizo.oss-cn-nanjing.aliyuncs.com/f782beb3-1be0-429f-8ee3-849cc289828d.png'
            },
            {
                name:'万民堂',
                score:'5.0分',
                sale:'月售2000+',
                time:'30分钟',
                distance:'0.8km',
                floor:'起送￥18',
                image:'https://mizo.oss-cn-nanjing.aliyuncs.com/f79946ab-58df-45c0-aacb-5ebf38f40e95.png'
            },
            {
                name:'蜜雪冰城',
                score:'4.2分',
                sale:'月售3000+',
                time:'60分钟',
                distance:'2km',
                floor:'起送￥20',
                image:'https://mizo.oss-cn-nanjing.aliyuncs.com/1039f896-1cea-4d86-9163-2b75a9be2eb9.png'
            }
        ],
        [],[],[]
    ])

    const bannerSrc = ref('https://mizo.oss-cn-nanjing.aliyuncs.com/0e76e4cf-74ec-4c4e-b2c2-a19ff3801bbf.png')

    const categoryList = reactive([])
    const dishList = reactive([])

    async function getDishList() {
        try {
            // 获取分类列表
            const res = await apiShopCategoryList()
            categoryList.length = 0
            categoryList.push(...res)
    
            // 获取每个分类下的菜品
            const promises = res.map(async (category) => {
                const dishes = await apiShopDishList(category.id)
                return {
                    ...category,
                    children: dishes
                }
            })
    
            const dishResults = await Promise.all(promises)
    
            // 更新 dishList
            dishList.length = 0
            dishList.push(...dishResults)
    
        } catch (err) {
            console.error('获取菜品列表失败', err)
        }
    }

    return { shopList, bannerSrc, dishList, getDishList}
})
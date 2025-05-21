const base_url = 'http://localhost:8080/user/';//开发环境
// const base_url = '你的测试环境url';//测试环境
// const base_url = '你的正式环境url';//正式环境
import {useUserStore} from '@/store/user.js'

// 请求超时设置
const timeout = 30000;
export function request(params) {
	const userStore = useUserStore()
	
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {
		'authentication': userStore.token || '',
		'content-type': 'application/json',
		...params.header
	};
 
	if (method === 'post') {
		header['content-type'] = 'application/json'
	}

	if (url === 'common/upload'){
		delete header['content-type']
	}

    uni.showLoading({
        title: '加载中'
    });

	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + url,
			method: method,
			header: header,
			data: data,
			timeout,
			success(response) {
				// console.log(response, '响应')
				const {
					statusCode,
					data,
					errMsg
				} = response;
				if (statusCode == 200) {
					if (data.code === 1) {
						resolve(data.data);//需要根据后端实际接口返回数据层级去resolve
						// resolve(data);
					} else if (data.code == 0) {
						console.log(data.msg)
						uni.showToast({
						      title: data.msg, // 确保 msg 是字符串，如果不是则使用 '未知错误'
							  icon: "error",
						      duration: 10000,
						    });
					}
				} else if (statusCode == 401) {
					uni.showToast({
						title: '请先登录',
						icon: "error",
						duration: 2000
					});
				}
			},
			fail(err) {
				console.log(err, '网络超时');
				uni.showToast({
					title: err.msg.indexOf('request:fail') !== -1 ? '网络连接失败' : '网络连接失败',
					icon: "error",
					duration: 2000
				});
				reject(err);
			},
			complete() {
				// 不管成功还是失败都会执行
				uni.hideLoading();
				// uni.hideToast();
			}
		})
	})
}

export function UploadFile(params) {
	const userStore = useUserStore()
	
	let url = params.url
	let filePath = params.filePath
	let name = params.name
	
	
	
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: base_url + url,
			filePath: filePath,         // 图片或文件路径
			name: name,               // 后端字段名，根据后端定义来写
			header: {
				authentication: userStore.token || ''
			},
			success: (res) => {
				const data = JSON.parse(res.data);
				if (data.code === 1) {
					resolve(data.data);
				} else {
					uni.showToast({
						title: data.msg || '上传失败',
						icon: 'error'
					});
					reject(data);
				}
			},
			fail: (err) => {
				uni.showToast({
					title: '上传失败',
					icon: 'error'
				});
				reject(err);
			}
		});
	});
}

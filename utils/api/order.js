import {request} from "../request"

export function apiOrder(page, pageSize, status){
    let url = `order/historyOrders?page=${page}&pageSize=${pageSize}`
    if (status !== undefined && status !== null && status !== '') {
        url += `&status=${status}`;
    }
	return request({
		url:url,
		method:'get'
	})
}
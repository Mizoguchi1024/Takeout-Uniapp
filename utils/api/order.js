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

export function apiOrderSubmit(addressBookId, packAmount, amount) {
	return request({
		url:'order/submit',
		method:'post',
		data:{
			addressBookId:addressBookId,
			payMethod:1,
			remark:'',
			estimatedDeliveryTime:'',
			deliveryStatus:1,
			tablewareNumber:1,
			tablewareStatus:1,
			packAmount:packAmount,
			amount:amount
		}
	})
}

export function apiOrderPay(orderNumber) {
	return request({
		url:'order/payment',
		method:'put',
		data:{
			orderNumber:orderNumber,
			payMethod:1
		}
	})
}
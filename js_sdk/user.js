import request from '@/utils/request.js'

export function register(data){
	return request.post("register",data)
}
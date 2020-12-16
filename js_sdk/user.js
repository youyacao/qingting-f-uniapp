import request from '@/utils/request.js'

export function register(data){
	return request.post("register",data)
}

export function login(data){
	return request.post("login",data)
}

export function getUser(){
	return request.post("user",{})
}
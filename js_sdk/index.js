import request from '@/utils/request.js'

export function category(){
	return request.post("movieCategory",null)
}

export function hotVideo(){
	return request.post("movie/index",null)
}

export function getLanchAd(){
	return request.post("advert/list",{type:1})
}
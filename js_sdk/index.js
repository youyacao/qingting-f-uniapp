import request from '@/utils/request.js'

export function category(){
	return request.post("movieCategory",null)
}

export function hotVideo(){
	return request.post("movie/index",null)
}
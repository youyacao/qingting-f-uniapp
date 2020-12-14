import request from '@/utils/request.js'

export function getVideo(id){
	return request.post("movie/view",{movie_id:id})
}

export function getVideoList(id){
	return request.post("movie/detailList",{movie_id:id,limit:100})
}

export function searchVideo(data){
	return request.post("movie/list",data)
}
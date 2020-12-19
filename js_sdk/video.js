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

export function addCollect(data){
	return request.post("collect/on",data)
}

export function removeCollect(data){
	return request.post("collect/off",data)
}

export function addLike(data){
	return request.post("like/on",data)
}

export function removeLike(data){
	return request.post("like/off",data)
}

export function uploadImage(data){
	return request.upload("upload",data)
}
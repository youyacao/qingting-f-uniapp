import request from '@/utils/request.js'

export function getVideo(id){
	return request.post("movie/view",{movie_id:id})
}
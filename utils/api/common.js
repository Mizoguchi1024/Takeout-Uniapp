import {UploadFile} from "../request"

export function apiUpload(filePath){
	return UploadFile({
		url:'common/upload',
		filePath:filePath,
		name:'file'
	})
}
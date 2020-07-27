import axios from 'axios'

import { PhotosPerPage } from '../config'

const createAxios = (token) => {
  const instance = axios.create({
    headers: {
      Accept: 'application/json'
    }
  })

  return instance
}

export const POST = (url, data) => createAxios().post(url, data)
export const GET = (url, params) => createAxios().get(url, { params })
export const DELETE = (url, data) => createAxios().delete(url, data)
export const PUT = (url, data) => createAxios().put(url, data)

export const GetImages = async (pageNum) => {
  try {
    const { data } = await POST(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/photos/list`, {
        skip: PhotosPerPage * (pageNum - 1),
        limit: PhotosPerPage
      }
    )
    if (data.message === 'OK') return data.documents
    return []
  } catch (err) {
    return []
  }
}

export const removePhoto = async (album, name) => {
  try {
    const { data } = await DELETE(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/photos/${album}/${name}`
    )
    if (data.message === 'OK') return true
    return false
  } catch (err) {
    return false
  }
}

export const uploadPhoto = async (album, files) => {
  try {
    const formData = new FormData()
    formData.append('album', album)
    for (let i = 0; i < files.length; i++) {
      formData.append('documents', files[i])
    }

    const { data } = await PUT(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/photos`, formData
    )

    if (data.message === 'OK') return data.data
    return []
  } catch (err) {
    return []
  }
}

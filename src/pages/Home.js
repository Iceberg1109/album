import React, { useEffect, useState } from 'react'
import { Container, Grid, Pagination } from 'semantic-ui-react'
import { NotificationContainer } from 'react-notifications'

import Menu from '../components/Menu'
import { PhotoModal, UploadModal } from '../components/Modals'

import { GetTotalCount, GetImages } from '../utils/api'

export default () => {
  const [pageNum, setPageNum] = useState(0)
  const [totalCnt, setTotalCnt] = useState(0)
  const [upload, setUpload] = useState(false)
  const [individual, setIndividual] = useState('')
  const [images, setImages] = useState([])

  useEffect(() => {
    GetTotalCount()
      .then((data) => {
        setTotalCnt(data)
      })
  }, [pageNum, totalCnt])

  useEffect(() => {
    GetImages(pageNum)
      .then((data) => {
        console.log(data)
        setImages(data)
      })
  }, [pageNum, totalCnt])

  const onPaginationChange = (e, { activePage }) => {
    setPageNum(activePage)
  }
  return (
    <>
      <Menu setUpload={setUpload} />

      <PhotoModal imgSrc={individual} onClose={setIndividual} />
      <UploadModal open={upload} onClose={setUpload} setTotalCnt={() => setTotalCnt(totalCnt + 1)} />
      <NotificationContainer />
    </>
  )
}

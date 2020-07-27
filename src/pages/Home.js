import React, { useEffect, useState } from 'react'
import { NotificationContainer } from 'react-notifications'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry from 'react-masonry-css'

import Menu from '../components/Menu'
import Photo from '../components/Photo'
import { PhotoModal, UploadModal } from '../components/Modals'

import { GetImages } from '../utils/api'

export default () => {
  const [pageNum, setPageNum] = useState(0)
  const [upload, setUpload] = useState(false)
  const [individual, setIndividual] = useState('')
  const [images, setImages] = useState([])
  const [end, setEnd] = useState(false)

  useEffect(() => {
    GetImages(1)
      .then((data) => {
        setImages(data)
      })
  }, [])

  const getMorePhotoes = () => {
    GetImages(pageNum + 1)
      .then((data) => {
        console.log(data)
        if (data.length === 0) {
          setEnd(true)
        }
        const result = images.concat(data)
        setImages(result)
      })
    setPageNum(pageNum + 1)
  }

  const removefromState = (id) => {
    const removed = images.filter(v => v.id !== id)
    setImages(removed)
  }

  return (
    <>
      <Menu setUpload={setUpload} />

      <InfiniteScroll
        dataLength={images.length}
        next={getMorePhotoes}
        hasMore={!end}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Masonry
          breakpointCols={3}
          className='investax-masonry-grid'
          columnClassName='investax-masonry-grid_column'
        >
          {
            images.map((img) => {
              return (
                <Photo data={img} key={img.id} showModal={setIndividual} removeMe={removefromState} />
              )
            })
          }
        </Masonry>
      </InfiniteScroll>

      <PhotoModal imgSrc={individual} onClose={setIndividual} />
      <UploadModal open={upload} onClose={setUpload} />
      <NotificationContainer />
    </>
  )
}
